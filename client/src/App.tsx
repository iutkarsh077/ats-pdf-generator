import { useState, useEffect, useId, useRef, type ChangeEvent, type DragEvent } from 'react'
import axios from 'axios'
import api from './api'
import {
  FileText,
  UploadCloud,
  Check,
  AlertCircle,
  Trash2,
  Clipboard,
  Sparkles,
  Download,
  ExternalLink,
  Layers,
  Terminal,
  ArrowRight,
  FileUp,
  RefreshCw,
  Copy,
  X,
  Briefcase
} from 'lucide-react'

const SAMPLE_JD_PRESETS = [
  {
    id: 'fullstack',
    label: 'Senior Full-Stack',
    content: `Senior Full-Stack Engineer

About the Role:
We are seeking an experienced Senior Full-Stack Engineer to lead the architecture and development of scalable web applications. You will collaborate closely with product managers, designers, and AI researchers to build high-performance user interfaces and resilient backend microservices.

Key Responsibilities:
• Design, build, and maintain efficient, reusable, and reliable TypeScript code across the stack.
• Architect RESTful APIs and real-time streaming services using Node.js and Express.
• Develop responsive, accessible, and high-performance frontends using React, Next.js, and modern CSS.
• Integrate LLM APIs, vector databases, and document parsing pipelines with strict latency SLAs.
• Collaborate on CI/CD pipelines, automated testing, and cloud infrastructure deployment.

Requirements & Qualifications:
• 5+ years of professional full-stack software development experience.
• Strong proficiency in TypeScript, React, Node.js, and modern state management.
• Hands-on experience with SQL (PostgreSQL) and NoSQL databases.
• Familiarity with Docker, cloud providers (AWS/GCP), and Git workflows.
• Excellent communication skills and passion for high-craft user experiences.`
  },
  {
    id: 'ai-eng',
    label: 'AI & Systems',
    content: `Staff AI Systems Engineer

About the Role:
We are looking for a Staff AI Systems Engineer to build production inference infrastructure, document ingestion pipelines, and agentic workflows. You will bridge model capabilities with robust distributed backend services.

Key Responsibilities:
• Architect resilient agentic orchestration systems and prompt engineering pipelines.
• Build scalable document retrieval, chunking, and embedding workflows on AWS.
• Optimize LLM inference latency, token usage, and cost-efficiency at scale.
• Implement automated evaluation harnesses to benchmark output consistency and quality.

Requirements:
• 6+ years of software engineering experience with 2+ years working directly with generative AI APIs.
• Deep expertise in Python, TypeScript, Node.js, and vector databases (Pinecone, pgvector).
• Strong distributed systems knowledge (Redis, SQS, Kafka, AWS Lambda).`
  },
  {
    id: 'frontend',
    label: 'Design Engineer',
    content: `Senior Frontend & Design Engineer

About the Role:
We are seeking a Design Engineer who obsesses over interaction design, performance, and typography. You will work at the intersection of Figma and production code to craft world-class software interfaces.

Key Responsibilities:
• Build pixel-perfect, accessible, and fluid user interfaces in React and TypeScript.
• Architect cohesive design systems with reusable components and rigorous token hierarchies.
• Polish micro-interactions, layout transitions, and keyboard navigation flows.
• Profile and optimize Core Web Vitals and browser rendering performance.

Requirements:
• 4+ years crafting web applications with deep mastery of React, CSS, and TypeScript.
• Exceptional aesthetic sensibility and portfolio demonstrating high-craft software.
• Deep empathy for typography, spacing, motion design, and developer workflows.`
  }
]

interface ResumeTemplate {
  id: string
  name: string
  description: string
  badge: string
  accentColor?: string
  structureTag?: string
  bestFor?: string
}

const DEFAULT_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'executive-navy',
    name: 'Executive Classic ATS',
    description: 'Centered header with crisp horizontal section dividers. Highest compatibility across enterprise Workday and Taleo scanners.',
    badge: 'Standard ATS',
    structureTag: '1-COL ATS',
    bestFor: 'Enterprise & Senior Roles'
  },
  {
    id: 'modern-tech',
    name: 'Tech & Engineering Matrix',
    description: 'Structured 3-column header with GitHub/LinkedIn metadata, category skill grid, and impact-focused metric bullet points.',
    badge: 'Tech Spec',
    structureTag: '3-COL HEADER',
    bestFor: 'Software & Data Engineers'
  },
  {
    id: 'ivy-league',
    name: 'Ivy League Monochrome',
    description: 'Ultra-dense, pure typography layout with strict margin geometry. Zero fluff, maximum content density for technical profiles.',
    badge: 'Pure Mono',
    structureTag: 'DENSE MONO',
    bestFor: 'Research & Quantitative'
  },
  {
    id: 'modern-slate',
    name: 'Minimalist Studio',
    description: 'Clean left-aligned hierarchy with subtle architectural metadata tags and streamlined experience milestones.',
    badge: 'Minimal',
    structureTag: 'MODERN GRID',
    bestFor: 'Design & Product Leads'
  }
]

function App() {
  const [jobDescription, setJobDescription] = useState('')
  const [activePreset, setActivePreset] = useState<string | null>('fullstack')
  const [notification, setNotification] = useState<{ message: string; type?: 'info' | 'success' | 'error' } | null>(null)
  const textareaId = useId()

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeKey, setResumeKey] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'requesting-url' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadStage, setUploadStage] = useState<string>('')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [templates, setTemplates] = useState<ResumeTemplate[]>(DEFAULT_TEMPLATES)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('executive-navy')

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState<string>('')
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isCopiedKey, setIsCopiedKey] = useState(false)

  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0
  const charCount = jobDescription.length
  const estimatedReadTime = Math.ceil(wordCount / 200)

  // Load initial sample
  useEffect(() => {
    setJobDescription(SAMPLE_JD_PRESETS[0].content)
  }, [])

  useEffect(() => {
    api.get('/templates')
      .then(res => {
        if (res.data?.data && Array.isArray(res.data.data)) {
          // Merge metadata
          const merged = res.data.data.map((t: any) => {
            const def = DEFAULT_TEMPLATES.find(d => d.id === t.id)
            return {
              ...t,
              structureTag: def?.structureTag || 'ATS COMPATIBLE',
              bestFor: def?.bestFor || 'General Technical'
            }
          })
          setTemplates(merged)
        }
      })
      .catch(err => {
        console.log('Using default templates list:', err)
      })
  }, [])

  // Listen for keyboard shortcut: Ctrl+Enter or Cmd+Enter to generate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (jobDescription.trim() && !isGenerating) {
          e.preventDefault()
          handleGeneratePdf()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [jobDescription, resumeKey, selectedTemplateId, isGenerating])

  const showNotice = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(curr => (curr?.message === message ? null : curr))
    }, 3200)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const uploadResumeToS3 = async (file: File) => {
    if (!file) return

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showNotice('Invalid file: only PDF documents are supported.', 'error')
      setUploadError('Only PDF files are supported.')
      return
    }

    setResumeFile(file)
    setUploadStatus('requesting-url')
    setUploadStage('REQUESTING_PRESIGNED_S3_LEASE')
    setUploadProgress(15)
    setUploadError(null)

    try {
      const presignedRes = await api.get('/presigned-url', {
        params: {
          fileName: file.name,
          fileType: file.type || 'application/pdf'
        }
      })

      const presignedUrl =
        presignedRes.data.url ||
        (typeof presignedRes.data.data === 'string'
          ? presignedRes.data.data
          : presignedRes.data.data?.url)

      const s3Key =
        presignedRes.data.key ||
        presignedRes.data.data?.key ||
        `resumes/${file.name}`

      if (!presignedUrl) {
        throw new Error('Backend failed to issue presigned authorization URL')
      }

      setUploadStatus('uploading')
      setUploadStage('STREAMING_TO_AWS_S3_STORAGE')
      setUploadProgress(35)

      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type || 'application/pdf'
        },
        onUploadProgress: (progressEvt) => {
          if (progressEvt.total) {
            const percent = Math.min(98, Math.round((progressEvt.loaded * 100) / progressEvt.total))
            setUploadProgress(percent)
          }
        }
      })

      setUploadProgress(100)
      setUploadStatus('success')
      setUploadStage('SYNCED_TO_OBJECT_STORE')
      setResumeKey(s3Key)
      showNotice(`Source PDF linked: ${file.name}`, 'success')
    } catch (err: any) {
      console.error('Error uploading PDF to S3:', err)
      setUploadStatus('error')
      let errorMsg = 'Failed to upload PDF directly to S3'
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message
      } else if (err.message) {
        errorMsg = err.message
      }
      setUploadError(errorMsg)
      showNotice(`Upload error: ${errorMsg}`, 'error')
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadResumeToS3(e.target.files[0])
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadResumeToS3(e.dataTransfer.files[0])
    }
  }

  const handleRemoveResume = () => {
    setResumeFile(null)
    setResumeKey(null)
    setUploadStatus('idle')
    setUploadProgress(0)
    setUploadStage('')
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    showNotice('Source resume detached', 'info')
  }

  const handleCopyKey = () => {
    if (resumeKey) {
      navigator.clipboard.writeText(resumeKey)
      setIsCopiedKey(true)
      showNotice('S3 Object key copied to clipboard', 'info')
      setTimeout(() => setIsCopiedKey(false), 2000)
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setJobDescription(text)
        setActivePreset(null)
        showNotice('Job criteria loaded from clipboard', 'info')
      } else {
        showNotice('Clipboard is empty', 'error')
      }
    } catch {
      showNotice('Clipboard read access blocked; use Ctrl+V', 'error')
    }
  }

  const handleClear = () => {
    setJobDescription('')
    setActivePreset(null)
    showNotice('Criteria field cleared', 'info')
  }

  const handleSelectPreset = (preset: typeof SAMPLE_JD_PRESETS[0]) => {
    setJobDescription(preset.content)
    setActivePreset(preset.id)
    showNotice(`Loaded preset: ${preset.label}`, 'info')
  }

  const handleGeneratePdf = async () => {
    if (!jobDescription.trim()) {
      showNotice('Role criteria cannot be empty', 'error')
      return
    }

    try {
      setIsGenerating(true)
      setGenerationStep('INGESTING_CRITERIA_AND_TEMPLATE')
      showNotice('Compiling ATS layout and tailoring resume...', 'info')

      const stepTimer1 = setTimeout(() => {
        setGenerationStep('SYNTHESIZING_BULLETS_WITH_OPENAI')
      }, 1500)

      const stepTimer2 = setTimeout(() => {
        setGenerationStep('RENDERING_PUPPETEER_PDF_STREAM')
      }, 4000)

      const res = await api.post(
        '/llm-prompt',
        {
          jobDescription,
          resumeKey: resumeKey || undefined,
          templateId: selectedTemplateId
        },
        { responseType: 'blob' }
      )

      clearTimeout(stepTimer1)
      clearTimeout(stepTimer2)

      const blob =
        res.data instanceof Blob ? res.data : new Blob([res.data], { type: 'application/pdf' })

      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }

      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
      showNotice('PDF compiled and ready for download!', 'success')

      // Trigger instant download
      const link = document.createElement('a')
      link.href = url
      link.download = `${selectedTemplateId}-tailored-resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error: any) {
      console.error('Error generating PDF:', error)
      let errorMsg = 'Compilation failed'
      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text()
          const json = JSON.parse(text)
          if (json.message) errorMsg = json.message
        } catch {
          // fallback
        }
      } else if (error.message) {
        errorMsg = error.message
      }
      showNotice(`Error: ${errorMsg}`, 'error')
    } finally {
      setIsGenerating(false)
      setGenerationStep('')
    }
  }

  const activeTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0]

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans relative selection:bg-zinc-800 selection:text-white">
      {/* Background Architectural Grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid-lines opacity-20 z-0" />
      <div className="fixed inset-0 pointer-events-none bg-radial from-transparent via-transparent to-black/80 z-0" />

      {/* Top Engineering Nav / Command Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-white uppercase">
                ATS Precision Studio
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                ENGINE // v2.6
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800/90 text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
              <span>S3 PIPELINE: CONNECTED</span>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-400 border border-zinc-800 rounded-md px-2.5 py-1 bg-zinc-900/60">
              <span className="text-zinc-500">FORMAT:</span>
              <span className="text-zinc-200 font-medium uppercase">{selectedTemplateId}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Studio Workbench */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        
        {/* Studio Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-800/60">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
              <span>WORKBENCH</span>
              <span className="text-zinc-700">/</span>
              <span>RESUME SYNTHESIS &amp; ATS ALIGNMENT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Tailored Resume Generator
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
              Ingest your source resume to AWS S3, formulate target role requirements, and render clean, high-scoring ATS formats without visual noise.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[11px] text-zinc-400">
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
              INPUTS: {resumeKey ? 'RESUME + JD' : 'JD ONLY'}
            </span>
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
              PRESET: {activeTemplate.badge}
            </span>
          </div>
        </div>

        {/* Studio Primary Grid Layout: 2 Columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Input Pipeline (Source File + Job Criteria) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* PANEL 01: S3 PDF UPLOADER */}
            <section className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-sm overflow-hidden transition-all duration-200">
              {/* Header */}
              <div className="px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-medium text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    01
                  </span>
                  <h2 className="text-xs font-mono tracking-wider text-zinc-200 uppercase font-semibold flex items-center gap-1.5">
                    <FileUp className="w-3.5 h-3.5 text-zinc-400" />
                    Source Resume Ingestion
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    DIRECT S3 PUT
                  </span>
                </div>
              </div>

              {/* Uploader Body */}
              <div className="p-4 sm:p-5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!resumeFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 border border-dashed ${
                      isDragging
                        ? 'border-white bg-zinc-900/80'
                        : 'border-zinc-800 hover:border-zinc-600 bg-zinc-950/40 hover:bg-zinc-900/30'
                    }`}
                  >
                    {/* Corner registration crosshairs for architectural aesthetic */}
                    <div className="absolute top-1.5 left-1.5 text-zinc-700 font-mono text-[10px] select-none">+</div>
                    <div className="absolute top-1.5 right-1.5 text-zinc-700 font-mono text-[10px] select-none">+</div>
                    <div className="absolute bottom-1.5 left-1.5 text-zinc-700 font-mono text-[10px] select-none">+</div>
                    <div className="absolute bottom-1.5 right-1.5 text-zinc-700 font-mono text-[10px] select-none">+</div>

                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 text-zinc-300">
                      <UploadCloud className="w-5 h-5" />
                    </div>

                    <p className="text-sm font-medium text-zinc-200">
                      Select or drop existing Resume PDF
                    </p>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">
                      Accepts .pdf up to 25MB • Secure pre-signed lease
                    </p>

                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
                      <span>CLICK TO BROWSE</span>
                      <ArrowRight className="w-3 h-3 text-zinc-500" />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-white truncate max-w-[220px] sm:max-w-xs font-mono">
                              {resumeFile.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                              {formatFileSize(resumeFile.size)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] font-mono text-zinc-500">
                              STATUS: {uploadStage || 'PENDING'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {uploadStatus === 'error' && (
                          <button
                            type="button"
                            onClick={() => uploadResumeToS3(resumeFile)}
                            className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded bg-white text-black hover:bg-zinc-200 transition-colors"
                          >
                            <RefreshCw className="w-3 h-3" />
                            RETRY
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleRemoveResume}
                          disabled={uploadStatus === 'uploading' || uploadStatus === 'requesting-url'}
                          className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-40"
                          title="Remove file"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          REMOVE
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {(uploadStatus === 'uploading' || uploadStatus === 'requesting-url') && (
                      <div className="space-y-1.5 pt-1 font-mono">
                        <div className="flex items-center justify-between text-[11px] text-zinc-400">
                          <span className="flex items-center gap-1.5 text-zinc-300">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            TRANSFERRING TO S3 BUCKET...
                          </span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white transition-all duration-200"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* S3 Key pill */}
                    {uploadStatus === 'success' && resumeKey && (
                      <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                          <span>PERSISTED ON S3</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyKey}
                          className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                          title="Click to copy S3 key"
                        >
                          <span className="truncate max-w-[200px]">{resumeKey}</span>
                          {isCopiedKey ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Error display */}
                    {uploadStatus === 'error' && uploadError && (
                      <div className="p-2.5 rounded bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 flex items-start gap-2 font-mono">
                        <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white">Upload Interrupted:</span> {uploadError}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* PANEL 02: JOB DESCRIPTION CRITERIA */}
            <section className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-sm overflow-hidden transition-all duration-200">
              {/* Header */}
              <div className="px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/40 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-medium text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    02
                  </span>
                  <label htmlFor={textareaId} className="text-xs font-mono tracking-wider text-zinc-200 uppercase font-semibold flex items-center gap-1.5 cursor-pointer">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                    Target Role Specification
                  </label>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="Paste from clipboard (⌘V)"
                  >
                    <Clipboard className="w-3 h-3 text-zinc-400" />
                    PASTE
                  </button>

                  {jobDescription.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="Clear textarea"
                    >
                      <Trash2 className="w-3 h-3 text-zinc-400" />
                      CLEAR
                    </button>
                  )}
                </div>
              </div>

              {/* Preset Selectors */}
              <div className="px-4 pt-3 pb-2 border-b border-zinc-900 flex items-center gap-2 overflow-x-auto text-xs font-mono">
                <span className="text-zinc-500 text-[11px] uppercase tracking-wider shrink-0">PRESETS:</span>
                {SAMPLE_JD_PRESETS.map((p) => {
                  const isActive = activePreset === p.id
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors shrink-0 flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-white text-black border-white font-medium'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800'
                      }`}
                    >
                      {isActive && <Check className="w-3 h-3" />}
                      {p.label}
                    </button>
                  )
                })}
              </div>

              {/* Textarea */}
              <div className="p-4 sm:p-5">
                <textarea
                  id={textareaId}
                  rows={9}
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value)
                    setActivePreset(null)
                  }}
                  placeholder="// Paste target role requirements, responsibilities, and qualifications...&#10;&#10;Key parameters to provide:&#10;• Target Job Title&#10;• Core technical stack requirements&#10;• Expected deliverables & metrics"
                  className="w-full bg-black text-zinc-100 placeholder-zinc-600 text-xs sm:text-sm font-mono leading-relaxed p-4 rounded-lg border border-zinc-800/90 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 resize-y min-h-[190px] transition-all"
                  spellCheck={false}
                />
              </div>

              {/* Footer Telemetry */}
              <div className="px-4 py-2.5 border-t border-zinc-800/80 bg-zinc-950 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${wordCount > 0 ? 'bg-white' : 'bg-zinc-700'}`} />
                    <span className="text-white font-semibold">{wordCount}</span> WORDS
                  </span>
                  <span className="text-zinc-700">|</span>
                  <span>
                    <span className="text-white font-semibold">{charCount}</span> CHARS
                  </span>
                  <span className="text-zinc-700">|</span>
                  <span>~{estimatedReadTime} MIN READ</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {wordCount === 0 ? (
                    <span className="text-zinc-500">INPUT REQUIRED</span>
                  ) : wordCount < 50 ? (
                    <span className="text-zinc-400">SHORT CRITERIA (50+ REC.)</span>
                  ) : (
                    <span className="text-white flex items-center gap-1">
                      <Check className="w-3 h-3 text-white" />
                      OPTIMAL DENSITY
                    </span>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Template Selector & Actions Dock */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* PANEL 03: ATS TEMPLATE SELECTOR */}
            <section className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-medium text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    03
                  </span>
                  <h2 className="text-xs font-mono tracking-wider text-zinc-200 uppercase font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-zinc-400" />
                    ATS Layout Architecture
                  </h2>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase">
                  {templates.length} PRESETS
                </span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col gap-3">
                <p className="text-xs text-zinc-400 leading-normal">
                  Select structural typography and column hierarchy. The compilation engine structures all content to guarantee ATS parsing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  {templates.map((tpl) => {
                    const isSelected = tpl.id === selectedTemplateId
                    return (
                      <div
                        key={tpl.id}
                        onClick={() => setSelectedTemplateId(tpl.id)}
                        className={`group relative rounded-lg p-3.5 transition-all duration-150 cursor-pointer flex flex-col justify-between border ${
                          isSelected
                            ? 'border-white bg-zinc-900/90 shadow-md ring-1 ring-white/20'
                            : 'border-zinc-800/90 bg-black/60 hover:border-zinc-600 hover:bg-zinc-900/40'
                        }`}
                      >
                        <div>
                          {/* Micro Header */}
                          <div className="flex items-center justify-between gap-1.5 mb-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                              {tpl.structureTag || tpl.badge}
                            </span>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all ${
                              isSelected ? 'border-white bg-white text-black' : 'border-zinc-700 bg-transparent'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 text-black stroke-[3]" />}
                            </div>
                          </div>

                          <h3 className="font-semibold text-xs text-white tracking-tight leading-snug">
                            {tpl.name}
                          </h3>
                          <p className="text-[11px] text-zinc-400 leading-relaxed mt-1 line-clamp-2">
                            {tpl.description}
                          </p>
                        </div>

                        {/* Architectural Wireframe Schematic */}
                        <div className="mt-3 pt-2.5 border-t border-zinc-800/80 bg-zinc-950/80 p-2 rounded flex flex-col gap-1 select-none">
                          {tpl.id === 'executive-navy' && (
                            <>
                              <div className="w-16 h-1 bg-white mx-auto rounded-none" />
                              <div className="w-24 h-0.5 bg-zinc-600 mx-auto" />
                              <div className="w-full h-px bg-zinc-700 my-0.5" />
                              <div className="w-12 h-0.5 bg-zinc-400" />
                              <div className="w-full h-0.5 bg-zinc-600" />
                              <div className="w-20 h-0.5 bg-zinc-500" />
                            </>
                          )}
                          {tpl.id === 'modern-tech' && (
                            <>
                              <div className="flex justify-between items-center">
                                <div className="w-6 h-0.5 bg-zinc-500" />
                                <div className="w-10 h-1 bg-white" />
                                <div className="w-6 h-0.5 bg-zinc-500" />
                              </div>
                              <div className="w-14 h-0.5 bg-zinc-400 mt-1 border-b border-zinc-400" />
                              <div className="grid grid-cols-2 gap-1 mt-0.5">
                                <div className="h-0.5 bg-zinc-600" />
                                <div className="h-0.5 bg-zinc-600" />
                              </div>
                            </>
                          )}
                          {tpl.id === 'ivy-league' && (
                            <>
                              <div className="w-14 h-1 bg-white mx-auto" />
                              <div className="w-full h-px bg-zinc-500 my-0.5" />
                              <div className="w-16 h-0.5 bg-zinc-400" />
                              <div className="w-full h-0.5 bg-zinc-600" />
                              <div className="w-full h-px bg-zinc-500" />
                            </>
                          )}
                          {tpl.id === 'modern-slate' && (
                            <>
                              <div className="w-14 h-1 bg-white" />
                              <div className="w-8 h-0.5 bg-zinc-500" />
                              <div className="w-full h-px bg-zinc-800 my-0.5" />
                              <div className="flex items-center gap-1">
                                <div className="w-1 h-1.5 bg-white" />
                                <div className="w-16 h-0.5 bg-zinc-400" />
                              </div>
                              <div className="w-full h-0.5 bg-zinc-600" />
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* PANEL 04: EXECUTION & GENERATION CONTROL */}
            <section className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    04
                  </span>
                  <span className="text-xs font-mono uppercase font-semibold text-zinc-200">
                    Pipeline Execution
                  </span>
                </div>

                <div className="text-[11px] font-mono text-zinc-400">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">⌘ + ↵</kbd>
                </div>
              </div>

              {/* Status Checklist */}
              <div className="flex flex-col gap-2 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-zinc-900/50 border border-zinc-800/60">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-zinc-500" />
                    Source Resume:
                  </span>
                  {resumeKey ? (
                    <span className="text-white flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3 text-emerald-400" /> S3 ATTACHED
                    </span>
                  ) : (
                    <span className="text-zinc-500">OPTIONAL (COLD START)</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-zinc-900/50 border border-zinc-800/60">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                    Target Criteria:
                  </span>
                  {wordCount > 0 ? (
                    <span className="text-white flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3 text-emerald-400" /> {wordCount} WORDS
                    </span>
                  ) : (
                    <span className="text-zinc-500">AWAITING INPUT</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-zinc-900/50 border border-zinc-800/60">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-zinc-500" />
                    Selected Format:
                  </span>
                  <span className="text-white font-medium">
                    {activeTemplate.name}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                disabled={isGenerating || !jobDescription.trim()}
                onClick={handleGeneratePdf}
                className={`w-full py-3 px-4 rounded-lg font-medium text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isGenerating || !jobDescription.trim()
                    ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed opacity-60'
                    : 'bg-white text-black hover:bg-zinc-200 active:scale-[0.99] border border-white shadow-lg shadow-white/5 font-semibold'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                    <span>{generationStep || 'GENERATING TAILORED PDF...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>Compile &amp; Download PDF</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-zinc-500 font-mono text-center">
                Press <kbd className="text-zinc-300">Ctrl</kbd> + <kbd className="text-zinc-300">Enter</kbd> to compile instantly.
              </p>
            </section>
          </div>
        </div>

        {/* OUTPUT INSPECTION DECK (Embedded PDF Preview) */}
        {pdfUrl && (
          <section className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
            {/* Toolbar */}
            <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 font-mono">
                <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-white">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white tracking-tight">
                    COMPILED OUTPUT INSPECTOR
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Format: <span className="text-zinc-200 font-medium">{activeTemplate.name}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                  OPEN TAB
                </a>

                <a
                  href={pdfUrl}
                  download={`${selectedTemplateId}-tailored-resume.pdf`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-black hover:bg-zinc-200 font-semibold transition-colors"
                >
                  <Download className="w-3 h-3 text-black" />
                  DOWNLOAD PDF
                </a>
              </div>
            </div>

            {/* Viewer Frame */}
            <div className="w-full h-[760px] bg-black border-t border-zinc-900">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="Generated Tailored Resume Preview"
              />
            </div>
          </section>
        )}

        {/* Studio System Specs Footer */}
        <footer className="mt-6 pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-zinc-500 pb-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span>ATS SCHEMA COMPLIANT</span>
            <span className="text-zinc-700">/</span>
            <span>OPENAI GPT-4o</span>
            <span className="text-zinc-700">/</span>
            <span>AWS S3 PRESIGNED CLIENT LEASE</span>
          </div>

          <div>
            DESIGNED WITH HIGH CRAFT &bull; ZERO SLOP
          </div>
        </footer>
      </main>

      {/* Floating Tactical Notification HUD */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-zinc-900/95 text-white border border-zinc-700/80 shadow-2xl backdrop-blur-md text-xs font-mono animate-in fade-in slide-in-from-bottom-2">
          <span className={`w-2 h-2 rounded-full ${
            notification.type === 'error'
              ? 'bg-red-400'
              : notification.type === 'success'
              ? 'bg-emerald-400'
              : 'bg-white'
          }`} />
          <span>{notification.message}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="ml-2 text-zinc-500 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  )
}

export default App
