import "dotenv/config";
import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import { ChatOpenAI } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PDFParse } from "pdf-parse";
import { getPresignedUploadUrl, downloadFileFromS3 } from "./s3config.js";
import {
    resumeTemplates,
    getTemplateById,
    buildMasterPrompt
} from "./constant.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

const port = process.env.PORT || 3000;

async function extractTextFromPdfBuffer(buffer) {
    const parser = new PDFParse({ data: buffer });
    try {
        const textResult = await parser.getText();
        return (textResult.text || "").trim();
    } finally {
        await parser.destroy();
    }
}

async function generatePDF(html) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    try {
        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: "networkidle0",
            timeout: 30000
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: false
        });

        return Buffer.from(pdfBuffer);
    } finally {
        await browser.close();
    }
}

// 1. Presigned S3 Upload URL Endpoint
app.get(["/presigned-url", "/api/presigned-url"], async (req, res) => {
    try {
        let { key, fileName, fileType } = req.query;
        const sanitizedFileName = (fileName || key || "resume.pdf").replace(/[^a-zA-Z0-9.-]/g, "_");
        const s3Key = key || `resumes/${Date.now()}-${sanitizedFileName}`;
        const contentType = fileType || "application/pdf";
        const url = await getPresignedUploadUrl(s3Key, contentType);

        return res.status(200).json({
            message: "Presigned URL generated successfully",
            status: true,
            data: url,
            url,
            key: s3Key
        });
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        return res.status(500).json({
            message: error.message || "Failed to generate presigned URL",
            status: false
        });
    }
});

// 2. Available Resume Templates Endpoint
app.get(["/templates", "/api/templates"], (req, res) => {
    try {
        const templateList = resumeTemplates.map(t => ({
            id: t.id,
            name: t.name,
            description: t.description,
            badge: t.badge,
            accentColor: t.accentColor
        }));

        return res.status(200).json({
            message: "Resume templates retrieved successfully",
            status: true,
            data: templateList
        });
    } catch (error) {
        console.error("Error retrieving templates:", error);
        return res.status(500).json({
            message: error.message || "Failed to retrieve templates",
            status: false
        });
    }
});

// 3. Tailored Resume Generation Pipeline Endpoint
app.post(["/llm-prompt", "/api/llm-prompt"], async (req, res) => {
    try {
        const { jobDescription, resumeKey, templateId } = req.body;
        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({
                message: "Job description is required",
                status: false
            });
        }

        const chosenTemplate = getTemplateById(templateId);
        console.log(`\n=== Processing Resume Alignment Pipeline ===`);
        console.log(`Selected Template: ${chosenTemplate.name} (id: ${chosenTemplate.id})`);
        console.log(`Job description received (${jobDescription.trim().length} chars).`);

        let candidateResumeText = "";

        if (resumeKey) {
            console.log(`Loading uploaded PDF from AWS S3 (Key: ${resumeKey})...`);
            try {
                const pdfBuffer = await downloadFileFromS3(resumeKey);
                console.log(`Downloaded ${pdfBuffer.length} bytes from S3.`);

                console.log("Parsing PDF text and sections...");
                candidateResumeText = await extractTextFromPdfBuffer(pdfBuffer);
                console.log(`Extracted ${candidateResumeText.length} characters of resume text from PDF.`);
            } catch (s3Error) {
                console.error("Error downloading/parsing PDF from S3:", s3Error);
            }
        } else {
            console.log("No resumeKey provided. Generating resume layout from job criteria alone.");
        }

        const resumeDoc = new Document({
            pageContent: candidateResumeText || `Candidate profile details based on target criteria:\n${jobDescription}`,
            metadata: {
                source: resumeKey || "direct_input",
                hasOriginalResume: Boolean(candidateResumeText),
                templateId: chosenTemplate.id
            }
        });

        const model = new ChatOpenAI({
            model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
            temperature: 0.2,
            apiKey: process.env.OPENAI_API_KEY
        });

        const promptText = buildMasterPrompt({
            candidateResumeText: resumeDoc.pageContent,
            jobDescription: jobDescription,
            referenceTemplateHtml: chosenTemplate.html
        });

        console.log("Invoking OpenAI LLM via LangChain pipeline with selected template...");

        const response = await model.invoke(promptText);
        const parser = new StringOutputParser();
        let html = await parser.invoke(response);

        if (html.startsWith("```")) {
            html = html.replace(/^```(?:html)?\s*\n?/, "").replace(/\n?```$/, "").trim();
        }

        console.log("HTML and CSS successfully generated from LangChain & OpenAI!");
        console.log("Compiling PDF with Puppeteer...");

        const pdfBuffer = await generatePDF(html);
        console.log(`Tailored PDF generated successfully! Size: ${pdfBuffer.length} bytes.`);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'inline; filename="tailored-resume.pdf"');
        res.setHeader("Content-Length", pdfBuffer.length);
        return res.status(200).send(pdfBuffer);
    } catch (error) {
        console.error("Error generating tailored resume PDF:", error);
        return res.status(500).json({
            message: error.message || "Failed to generate tailored resume PDF",
            status: false
        });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});