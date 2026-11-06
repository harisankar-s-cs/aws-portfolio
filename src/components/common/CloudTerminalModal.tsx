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
          <p className="text-amber-lamp font-bold">Harisankar S — Cloud Systems & DL Terminal v2.4 (AWS Amplify Gen 2)</p>
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
    const cmd = rawCmd.trim().toLowerCase()
    if (!cmd) return

    let output: React.ReactNode = null

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-muted">
            <p className="text-bone font-bold">Available Commands:</p>
            <p><span className="text-amber-lamp font-bold">whoami</span> - Display current visitor role & IAM identity</p>
            <p><span className="text-amber-lamp font-bold">aws status</span> - Check CloudFront edge, S3 origin, and Lambda health</p>
            <p><span className="text-amber-lamp font-bold">projects</span> - List deep learning and computer vision projects</p>
            <p><span className="text-amber-lamp font-bold">resume</span> - Open the printable Curriculum Vitae</p>
            <p><span className="text-amber-lamp font-bold">ping</span> - Execute simulated edge latency test</p>
            <p><span className="text-amber-lamp font-bold">clear</span> - Clear the terminal output</p>
            <p><span className="text-amber-lamp font-bold">exit</span> - Close terminal window</p>
          </div>
        )
        break

      case 'whoami':
        output = (
          <div className="text-bone space-y-0.5">
            <p>Identity: <span className="text-amber-lamp">guest-visitor</span></p>
            <p>IAM Role: <span className="text-muted">arn:aws:iam::123456789012:role/Amplify-Unauthenticated-Guest</span></p>
            <p>Target Profile: <span className="text-bone font-bold">{personal.name}</span> (ACM Chair, TKMCE)</p>
          </div>
        )
        break

      case 'aws status':
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
        break

      case 'projects':
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
        break

      case 'resume':
        output = (
          <div className="text-amber-lamp">
            Opening Curriculum Vitae...
            <p className="text-muted text-[11px]">Navigating to /resume</p>
          </div>
        )
        setTimeout(() => {
          window.location.href = '/resume'
        }, 500)
        break

      case 'ping':
        const ms = Math.floor(18 + Math.random() * 15)
        output = (
          <div className="text-emerald-400">
            64 bytes from cloudfront.net: icmp_seq=1 ttl=56 time={ms}ms (Edge Hit)
          </div>
        )
        break

      case 'clear':
        setHistory([])
        setInputVal('')
        return

      case 'exit':
        onClose()
        return

      default:
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
          {['aws status', 'projects', 'resume', 'ping', 'whoami'].map((q) => (
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
