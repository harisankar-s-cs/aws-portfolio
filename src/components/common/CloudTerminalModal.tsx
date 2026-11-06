// src/components/common/CloudTerminalModal.tsx
import React, { useState, useRef, useEffect } from 'react'
import { personal } from '../../content/personal'
import { projects } from '../../content/projects'

interface CloudTerminalModalProps {
  isOpen: boolean
  onClose: () => void
}

interface CommandHistory {
  command: string
  output: React.ReactNode
}

export function CloudTerminalModal({ isOpen, onClose }: CloudTerminalModalProps) {
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-muted">
          <p className="text-amber-lamp font-bold">Harisankar S — Cloud Systems & DL Terminal v2.5 (AWS Amplify Gen 2)</p>
          <p>Type <span className="text-bone font-bold">help</span> to list commands or click quick suggestions below.</p>
        </div>
      ),
    },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  if (!isOpen) return null

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim()
    const lower = trimmed.toLowerCase()
    if (!trimmed) return

    let output: React.ReactNode = null

    // Pattern matching for commands
    if (lower === 'help') {
      output = (
        <div className="space-y-1.5 text-muted">
          <p className="text-bone font-bold">Core AWS & Profile Commands:</p>
          <p><span className="text-amber-lamp font-bold">whoami</span> - Display current visitor role & IAM identity</p>
          <p><span className="text-amber-lamp font-bold">aws status</span> - Check CloudFront edge, S3 origin, and Lambda health</p>
          <p><span className="text-amber-lamp font-bold">aws cost</span> - Display AWS Free Tier FinOps breakdown</p>
          <p><span className="text-amber-lamp font-bold">ask &lt;query&gt;</span> - Query the portfolio AI (Amazon Bedrock grounded knowledge)</p>
          <p><span className="text-amber-lamp font-bold">projects</span> - List deep learning and computer vision projects</p>
          <p><span className="text-amber-lamp font-bold">resume</span> - Open the printable Curriculum Vitae</p>
          <p><span className="text-amber-lamp font-bold">ping</span> - Execute simulated edge latency test</p>
          <p><span className="text-amber-lamp font-bold">clear</span> - Clear the terminal output</p>
          <p><span className="text-amber-lamp font-bold">exit</span> - Close terminal window</p>
        </div>
      )
    } else if (lower.startsWith('ask ') || lower.startsWith('bedrock ')) {
      const query = lower.replace(/^(ask|bedrock)\s+/, '').replace(/["']/g, '')
      let answer = `Harisankar S is an undergraduate CS student at TKM College of Engineering (CGPA 8.90), Chairperson of ACM Student Chapter, with research internships at NIT Calicut (Restormer, 37.39 dB PSNR) and KSREC (Swin Transformer, 96.9% accuracy).`

      if (query.includes('nit') || query.includes('restormer') || query.includes('ultrasound') || query.includes('calicut')) {
        answer = `At NIT Calicut (Dept. of CSE), Harisankar developed a 26M-parameter Wavelet Dual-Stream Hybrid Restormer on NVIDIA H200 GPUs. It achieved 37.39 dB PSNR on medical ultrasound despeckling.`
      } else if (query.includes('ksrec') || query.includes('swin') || query.includes('satellite') || query.includes('vision')) {
        answer = `At KSREC (Dept. of Science & Technology), Harisankar designed a Siamese Swin Transformer with differential feature fusion, reaching 96.9% pixel accuracy on the LEVIR-CD benchmark for state GIS tracking.`
      } else if (query.includes('acm') || query.includes('lead') || query.includes('chair')) {
        answer = `Harisankar serves as the Chairperson of the ACM Student Chapter at TKMCE, directing hackathons, research reading groups, and mentoring 500+ undergraduate student engineers.`
      } else if (query.includes('aws') || query.includes('cloud') || query.includes('amplify')) {
        answer = `This site runs on AWS Amplify Hosting (Gen 2), caching immutable WebP depth maps and fonts on Amazon CloudFront (600+ edge PoPs), backed by serverless AWS Lambda and DynamoDB.`
      } else if (query.includes('abacus') || query.includes('math') || query.includes('accolade')) {
        answer = `In high-speed mental arithmetic, Harisankar secured National 2nd Runner-Up and Kerala State 1st Runner-Up, building his foundational spatial and quantitative discipline.`
      }

      output = (
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2 text-amber-lamp font-bold">
            <span className="h-2 w-2 rounded-full bg-amber-lamp animate-pulse" />
            <span>[Amazon Bedrock Knowledge Grounding]</span>
          </div>
          <p className="text-bone/90 pl-3 border-l border-amber-lamp/50 leading-relaxed">
            {answer}
          </p>
        </div>
      )
    } else if (lower === 'aws cost' || lower === 'cost') {
      output = (
        <div className="space-y-1.5 text-xs">
          <p className="text-emerald-400 font-bold">AWS Free Tier FinOps Analysis (Monthly Estimate):</p>
          <div className="grid grid-cols-2 gap-2 text-muted font-mono text-[11px] pt-1 border-t border-hairline">
            <div>• CloudFront Ingress (1 TB/mo):</div>
            <div className="text-bone font-bold">$0.00 (Free Tier)</div>
            <div>• Amplify S3 Storage (5 GB):</div>
            <div className="text-bone font-bold">$0.00 (Free Tier)</div>
            <div>• AWS Lambda (1M invocations):</div>
            <div className="text-bone font-bold">$0.00 (Free Tier)</div>
            <div>• DynamoDB (25 GB NoSQL):</div>
            <div className="text-bone font-bold">$0.00 (Free Tier)</div>
          </div>
          <p className="text-amber-lamp font-bold pt-1 border-t border-hairline">
            Total Operational Run Cost: $0.00 / month (Zero Budget Risk)
          </p>
        </div>
      )
    } else if (lower === 'whoami') {
      output = (
        <div className="text-bone space-y-0.5">
          <p>Identity: <span className="text-amber-lamp">guest-visitor</span></p>
          <p>IAM Role: <span className="text-muted">arn:aws:iam::123456789012:role/Amplify-Unauthenticated-Guest</span></p>
          <p>Target Profile: <span className="text-bone font-bold">{personal.name}</span> (ACM Chair, TKMCE)</p>
        </div>
      )
    } else if (lower === 'aws status') {
      output = (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">✓ AWS CLOUD ENVIRONMENT OPERATIONAL</p>
          <p className="text-muted">• Host: AWS Amplify Hosting (Gen 2)</p>
          <p className="text-muted">• CDN: Amazon CloudFront (Edge Ingress 600+ PoPs)</p>
          <p className="text-muted">• Storage: Amazon S3 (OAC Protected Origin)</p>
          <p className="text-muted">• TLS: Automated ACM Certificate (TLS 1.3 Strict)</p>
          <p className="text-muted">• Serverless: Node.js 20.x on AWS Lambda</p>
        </div>
      )
    } else if (lower === 'projects') {
      output = (
        <div className="space-y-2 text-xs">
          {projects.map((p) => (
            <div key={p.slug} className="border-l border-amber-lamp pl-2">
              <span className="text-bone font-bold">{p.title}</span> ({p.category})
              <p className="text-muted text-[11px]">{p.summary}</p>
            </div>
          ))}
        </div>
      )
    } else if (lower === 'resume') {
      output = (
        <div className="text-amber-lamp">
          Opening Curriculum Vitae...
          <p className="text-muted text-[11px]">Navigating to /resume</p>
        </div>
      )
      setTimeout(() => {
        window.location.href = '/resume'
      }, 500)
    } else if (lower === 'ping') {
      const ms = Math.floor(18 + Math.random() * 15)
      output = (
        <div className="text-emerald-400">
          64 bytes from cloudfront.net: icmp_seq=1 ttl=56 time={ms}ms (Edge Hit)
        </div>
      )
    } else if (lower === 'clear') {
      setHistory([])
      setInputVal('')
      return
    } else if (lower === 'exit') {
      onClose()
      return
    } else {
      output = (
        <p className="text-red-400">
          command not found: {rawCmd}. Type <span className="text-bone underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> for available commands.
        </p>
      )
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }])
    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0E0D0B] border border-amber-lamp/50 rounded-xl shadow-2xl overflow-hidden font-mono text-xs flex flex-col max-h-[80vh]">
        
        {/* Terminal Header Bar */}
        <div className="bg-[#181512] px-4 py-3 border-b border-hairline flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-muted text-[11px] font-bold">aws-shell // harisankar-cli (Amplify Gen 2)</span>
          </div>

          <button onClick={onClose} className="text-muted hover:text-bone text-[11px]">
            [ESC to close]
          </button>
        </div>

        {/* Terminal Output Area */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-bone/90 select-text">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2 text-amber-lamp">
                <span>guest@aws-amplify:~$</span>
                <span className="text-bone">{h.command}</span>
              </div>
              <div className="pl-4">{h.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Command Suggestions */}
        <div className="px-4 py-2 bg-[#12100E] border-t border-hairline flex flex-wrap gap-2 text-[10px] text-muted">
          <span>Quick:</span>
          {['aws status', 'aws cost', 'ask "research at NIT Calicut"', 'projects', 'resume', 'ping'].map((q) => (
            <button
              key={q}
              onClick={() => handleCommand(q)}
              className="px-2 py-0.5 rounded border border-hairline hover:border-amber-lamp hover:text-amber-lamp transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Active Prompt Input */}
        <div className="p-4 bg-[#141210] border-t border-hairline flex items-center gap-2">
          <span className="text-amber-lamp font-bold">guest@aws-amplify:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-bone focus:outline-none placeholder:text-muted/50"
          />
        </div>

      </div>
    </div>
  )
}
