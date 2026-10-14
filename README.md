# ATS Resume Precision Studio & Alignment Engine

> An end-to-end, high-craft platform for ingesting resumes, aligning experience to target role criteria via OpenAI & LangChain, and compiling pixel-perfect, ATS-compliant PDF resumes with Puppeteer and AWS S3.

Built with a **monochromatic design-engineering aesthetic** (pure black & white, tactile telemetry, keyboard shortcuts, and zero AI slop).

<p align="center">
  <img src="https://res.cloudinary.com/dakddv1pm/image/upload/v1791991054/posts/a1n4gbvrnjgnu6mdhot1.png" alt="ATS Resume Precision Studio Interface" width="100%" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [How It Works (System Architecture)](#how-it-works-system-architecture)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started (Fork & Run)](#getting-started-fork--run)
  - [1. Fork and Clone](#1-fork-and-clone)
  - [2. Configure Environment Variables](#2-configure-environment-variables)
  - [3. Configure AWS S3 Bucket CORS](#3-configure-aws-s3-bucket-cors)
  - [4. Install Dependencies & Run Backend](#4-install-dependencies--run-backend)
  - [5. Install Dependencies & Run Frontend](#5-install-dependencies--run-frontend)
- [API Reference](#api-reference)
- [Adding New Resume Templates](#adding-new-resume-templates)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Overview

Applying to competitive roles requires tailoring technical resumes to match specific job descriptions. However, doing this manually is tedious and often results in:
- ATS (Applicant Tracking System) parsing errors due to complex graphics or multi-column text boxes.
- Inconsistent bullet points that fail keyword screening.
- Broken layout formatting across PDF compilers.

**ATS Resume Precision Studio** solves this with an automated, high-precision pipeline:
1. Ingests an existing candidate resume PDF directly into AWS S3 using secure pre-signed URLs.
2. Extracts raw text and career milestones with `pdf-parse`.
3. Synthesizes role alignment using **LangChain & OpenAI** (`gpt-4o-mini` or `gpt-4o`).
4. Injects structured candidate data into clean, single/multi-column HTML/CSS ATS templates.
5. Renders a vector A4 PDF using headless **Puppeteer** with zero unwanted borders or formatting artifacts.

---

## How It Works (System Architecture)

```mermaid
flowchart TD
    subgraph Client["Frontend Client (React 19 + TypeScript + Tailwind 4)"]
        UI["Precision Studio Workbench"]
        Upload["File Dropzone"]
        Editor["Job Description Specification"]
        Tpl["ATS Template Selector"]
        Viewer["Live PDF Inspector Deck"]
    end

    subgraph AWS["AWS Cloud Storage"]
        S3["AWS S3 Bucket (resumes/)"]
    end

    subgraph Server["Backend Server (Node.js + Express 5)"]
        API["REST API Router"]
        S3Lease["Pre-signed URL Generator"]
        PDFParser["PDF Text Parser (pdf-parse)"]
        LLEngine["LangChain + OpenAI Engine"]
        Templates["Master HTML/CSS ATS Templates"]
        Renderer["Puppeteer Headless PDF Compiler"]
    end

    Upload -->|1. Request Pre-signed Lease| API
    API -->|2. Generate Signed PUT URL| S3Lease
    S3Lease -->|3. Return Pre-signed URL| Upload
    Upload -->|4. Direct Stream Upload| S3

    Editor -->|5. Submit Job Criteria + S3 Key + Template ID| API
    API -->|6. Fetch Resume Buffer| S3
    S3 -->|7. PDF Buffer Stream| PDFParser
    PDFParser -->|8. Candidate Milestones Text| LLEngine
    Templates -->|9. Reference Layout Skeleton| LLEngine
    LLEngine -->|10. Synthesize Tailored ATS HTML| Renderer
    Renderer -->|11. Compile Vector A4 PDF Stream| Viewer
```

---

## Key Features

- **High-Craft Monochrome Interface**: Designed with a pure black-and-white aesthetic, subtle architectural drafting grids, tactile buttons, and no distracting neon gradients or visual clutter.
- **Direct-to-S3 Uploads**: Files stream directly from the browser to your AWS S3 bucket via time-limited pre-signed URLs, eliminating server bandwidth bottlenecks.
- **Keyboard Shortcuts**: Press <kbd>Cmd</kbd> / <kbd>Ctrl</kbd> + <kbd>Enter</kbd> from anywhere on the workbench to compile your resume instantly.
- **Instant Role Presets**: One-click criteria loading for *Senior Full-Stack*, *AI & Systems*, and *Design Engineer* roles.
- **Live Text Telemetry**: Real-time word counter, character meter, and reading time indicator.
- **4 Built-in ATS Formats**:
  - `Executive Classic ATS` &mdash; Centered header, clean divider lines, maximum enterprise compatibility.
  - `Tech & Engineering Matrix` &mdash; 3-column header (GitHub / LinkedIn / Email) with categorized technical skill blocks.
  - `Ivy League Monochrome` &mdash; High-density academic typography with strict margins.
  - `Minimalist Studio` &mdash; Left-aligned, contemporary design and engineering format.
- **Real-Time Output Deck**: Embedded preview iframe with direct download and open-in-new-tab capabilities.

---

## Tech Stack

### Frontend (`client/`)
- **React 19** &amp; **TypeScript**
- **Vite 6**
- **Tailwind CSS v4**
- **Lucide React** (Clean monochrome vector iconography)
- **Axios** (HTTP client)
- **Geist &amp; Geist Mono** typography

### Backend (`server/`)
- **Node.js** &amp; **Express 5**
- **LangChain** (`@langchain/openai`, `@langchain/core`)
- **OpenAI API** (`gpt-4o-mini`, `gpt-4o`)
- **Puppeteer** (Headless Chrome vector PDF compilation)
- **AWS SDK v3** (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)
- **pdf-parse** (Buffer-level PDF text extraction)

---

## Project Structure

```text
├── client/                     # Frontend SPA (React + TypeScript + Vite)
│   ├── src/
│   │   ├── App.tsx             # Main Precision Studio UI workbench
│   │   ├── api.ts              # Axios instance targeting backend API
│   │   ├── index.css           # Monochrome design system & grid patterns
│   │   └── main.tsx            # React application entry point
│   ├── index.html              # HTML shell with Google Fonts (Geist, Inter)
│   ├── package.json
│   └── vite.config.ts
│
├── server/                     # Backend API & PDF Generation Engine
│   ├── app.js                  # Express endpoints, LangChain pipeline, Puppeteer
│   ├── constant.js             # ATS templates & master prompt builder
│   ├── s3config.js             # AWS S3 client & pre-signed URL utilities
│   ├── .env.example            # Environment variable template
│   └── package.json
│
└── README.md                   # Project documentation
```

---

## Prerequisites

Before running the project locally, ensure you have:
1. **Node.js** (v18.0.0 or higher; v20+ recommended) &amp; `npm`.
2. An **OpenAI API Key** with access to `gpt-4o-mini` or `gpt-4o`.
3. An **AWS Account** with:
   - An S3 bucket created.
   - An IAM user with `s3:PutObject` and `s3:GetObject` permissions.

---

## Getting Started (Fork & Run)

### 1. Fork and Clone

Click the **Fork** button on GitHub, then clone your repository:

```bash
git clone https://github.com/YOUR_USERNAME/ats-resume-precision-studio.git
cd ats-resume-precision-studio
```

---

### 2. Configure Environment Variables

Navigate to the `server/` directory and create your `.env` file from the provided template:

```bash
cd server
cp .env.example .env
```

Open `.env` and fill in your credentials:

```ini
# Server Configuration
PORT=3000

# OpenAI API Key
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4o-mini

# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY1=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_KEY1=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 3. Install Dependencies & Run Backend

In your terminal:

```bash
cd server
npm install
npm run dev
```

The server will start listening at `http://localhost:3000`.

---

### 4. Install Dependencies & Run Frontend

Open a new terminal tab:

```bash
cd client
npm install
npm run dev
```

The frontend development server will spin up at `http://localhost:5173`. Open this URL in your browser to start generating resumes!

---

## API Reference

The backend provides the following endpoints under `/api`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/presigned-url` | Issues a time-limited AWS S3 PUT URL for direct browser uploads. Query params: `fileName`, `fileType`. |
| `GET` | `/api/templates` | Returns the list of registered ATS resume templates (id, name, description, badge). |
| `POST` | `/api/llm-prompt` | Triggers the LangChain alignment and Puppeteer PDF compilation pipeline. Returns binary PDF (`application/pdf`). |

### Example Payload for `/api/llm-prompt`:

```json
{
  "jobDescription": "Senior Full-Stack Engineer with React and Node.js experience...",
  "resumeKey": "resumes/1728912345-my_resume.pdf",
  "templateId": "executive-navy"
}
```

---

## Adding New Resume Templates

All templates reside in [`server/constant.js`](file:///c:/Users/utkar/Downloads/pdf/server/constant.js). To add your own custom ATS layout:

1. Open `server/constant.js`.
2. Add a new template entry to the `resumeTemplates` array:

```javascript
{
  id: "my-custom-template",
  name: "Silicon Valley Tech Lead",
  description: "2-column technical layout with emphasis on GitHub metrics and patents.",
  badge: "Tech Lead",
  accentColor: "#000000",
  html: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add print-optimized CSS with strict A4 page boundaries */
    @page { size: A4; margin: 12mm; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; }
  </style>
</head>
<body>
  <!-- Semantic ATS HTML skeleton -->
</body>
</html>`
}
```

The frontend and backend will automatically pick up and render the new template in the selector.

---

## Troubleshooting

- **CORS error during S3 upload**: Verify that your S3 bucket CORS configuration includes `http://localhost:5173` and allows the `PUT` method.
- **OpenAI Quota Exceeded (429)**: Ensure your OpenAI account has an active payment method and available API credits.
- **Puppeteer sandbox errors in Linux/Docker**: In headless Linux environments, install missing Chromium dependencies:
  ```bash
  sudo apt-get install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
  ```

---

## License

This project is licensed under the [ISC License](file:///c:/Users/utkar/Downloads/pdf/server/package.json). Feel free to fork, adapt, and build upon it!
