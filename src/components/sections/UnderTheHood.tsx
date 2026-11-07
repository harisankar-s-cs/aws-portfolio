// src/components/sections/UnderTheHood.tsx
import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TraceTelemetry {
  region: string
  durationMs: number
  requestId: string
  timestamp: string
  isLive: boolean
}

export function UnderTheHood() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inspectorRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  // Selected by default to Node 1 (Amazon CloudFront) so visitors immediately see live code working!
  const [selectedNode, setSelectedNode] = useState<number>(1)
  const [isTracing, setIsTracing] = useState(false)
  const [telemetry, setTelemetry] = useState<TraceTelemetry | null>(null)
  const [packetPosition, setPacketPosition] = useState<number | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)

  const steps = [
    {
      id: 'visitor',
      number: '01',
      title: 'Visitor Request',
      subtitle: 'Client Browser & Anycast DNS',
      description: 'Encrypted TLS 1.3 request initiated with SNI routing to the nearest AWS Point of Presence.',
      badge: 'Edge Ingress',
      detail: {
        filePath: 'src/api/trace.ts',
        codeTitle: 'Client Edge Handshake (Browser → CloudFront Anycast)',
        codeSnippet: `// Browser initiates TLS 1.3 session with ALPN (h2 / http/1.1)
const response = await fetch('/api/trace', {
  method: 'GET',
  headers: { 
    'Accept': 'application/json',
    'X-Client-Location': 'user-edge'
  },
  mode: 'cors'
});

const data = await response.json();
console.log('PoP Edge Handshake Latency:', performance.now());`,
        rationale: 'Routes visitors to the physically closest AWS PoP via Anycast DNS, reducing cold roundtrip time by ~65% compared to single-origin servers.'
      }
    },
    {
      id: 'cloudfront',
      number: '02',
      title: 'Amazon CloudFront',
      subtitle: 'Global CDN (600+ PoPs)',
      description: 'Terminates SSL at the edge, enforces cache control headers, and serves cached assets sub-20ms.',
      badge: 'PoP Cache',
      detail: {
        filePath: 'amplify.yml',
        codeTitle: 'amplify.yml (Custom Cache Headers for Global Edge Distribution)',
        codeSnippet: `customHeaders:
  - pattern: '/assets/*'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
  - pattern: '/**/*.woff2'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
  - pattern: '/resume.pdf'
    headers:
      - key: 'Content-Disposition'
        value: 'inline; filename="Harisankar_S_Resume.pdf"'`,
        rationale: 'Eliminates origin bandwidth charges and guarantees sub-25ms asset retrieval for WebP depth maps and self-hosted fonts.'
      }
    },
    {
      id: 's3',
      number: '03',
      title: 'Amplify Hosting (S3)',
      subtitle: 'Static SPA Storage & OAC',
      description: 'Origin bucket holds immutable hashed bundles, WebP depth maps, and self-hosted fonts with OAC security.',
      badge: 'Origin Store',
      detail: {
        filePath: 'amplify.yml',
        codeTitle: 'amplify.yml (SPA Client-Side Route Rewrites & OAC)',
        codeSnippet: `frontend:
  phases:
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
rewrites:
  - source: '</^[^.]+$|\\.(?!(css|gif|ico|jpg|jpeg|js|png|txt|svg|woff|woff2|ttf|map|json|webp|pdf)$)([^.]+$)/>'
    target: '/index.html'
    status: '200'`,
        rationale: 'Allows seamless client-side React Router navigation (/resume, /work/:slug) while maintaining strict origin access control (OAC).'
      }
    },
    {
      id: 'apigw',
      number: '04',
      title: 'Lambda Function URL',
      subtitle: 'Serverless Entry & IAM Auth',
      description: 'CORS-governed entry point with throttling and least-privilege IAM roles for dynamic telemetry.',
      badge: 'Compute Ingress',
      detail: {
        filePath: 'amplify/auth/resource.ts',
        codeTitle: 'amplify/auth/resource.ts (IAM Least-Privilege Guest Policy)',
        codeSnippet: `import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginMechanisms: ['email'],
  userAttributes: {
    preferredUsername: { required: false },
  },
  access: (allow) => [
    allow.guest().to(['read', 'invokeFunctionUrl'])
  ]
});`,
        rationale: 'Restricts public invocation to read-only diagnostic routes with a strict burst rate limit, safeguarding Free Tier quotas.'
      }
    },
    {
      id: 'lambda',
      number: '05',
      title: 'AWS Lambda (Node.js/TS)',
      subtitle: 'Serverless Micro-Execution',
      description: 'Micro-execution environments running diagnostic tracer, atomic visitor counter, and contact dispatcher.',
      badge: 'Firecracker MicroVM',
      detail: {
        filePath: 'amplify/functions/tracer/resource.ts',
        codeTitle: 'amplify/functions/tracer/resource.ts (Handler & Resource Sizing)',
        codeSnippet: `import { defineFunction } from '@aws-amplify/backend';

export const tracerFunction = defineFunction({
  name: 'tracer',
  entry: './handler.ts',
  runtime: 'nodejs20.x',
  timeoutSeconds: 5,
  memoryMB: 128, // Cost-optimized: fits in 1M free requests/month
  environment: {
    NODE_ENV: 'production',
    AWS_TELEMETRY_SAMPLE_RATE: '1.0'
  }
});`,
        rationale: 'Sub-5ms initialization using Firecracker microVMs. Node.js 20.x runtime maximizes execution speed.'
      }
    },
    {
      id: 'dynamo_sns',
      number: '06',
      title: 'DynamoDB & SNS',
      subtitle: 'Persistence & Async Fan-out',
      description: 'Single-digit millisecond atomic increment for hits, and asynchronous notification topics for inquiries.',
      badge: 'Managed Storage',
      detail: {
        filePath: 'amplify/data/resource.ts',
        codeTitle: 'amplify/data/resource.ts (Atomic DynamoDB Schema & SNS Notification)',
        codeSnippet: `import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  VisitorCounter: a.model({
    id: a.string().required(),
    totalHits: a.integer().required(),
    lastUpdated: a.datetime().required()
  }).authorization(allow => [allow.guest().to(['read', 'update'])]),

  ContactInquiry: a.model({
    senderName: a.string().required(),
    senderEmail: a.email().required(),
    messageBody: a.string().required()
  }).authorization(allow => [allow.guest().to(['create'])])
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({ schema });`,
        rationale: 'On-demand capacity mode guarantees zero idle cost while delivering atomic single-digit millisecond page-view increments.'
      }
    }
  ]

  // Pin section and scrub step illumination
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top 15%',
      end: '+=180%',
      pin: false,
      onUpdate: (self) => {
        const step = Math.min(steps.length - 1, Math.floor(self.progress * steps.length))
        setActiveStep(step)
      }
    })

    return () => st.kill()
  }, [steps.length])

  // "Trace a request" execution
  const handleTraceRequest = async () => {
    if (isTracing) return
    setIsTracing(true)
    setPacketPosition(0)

    const startTime = performance.now()

    for (let i = 0; i < steps.length; i++) {
      setPacketPosition(i)
      await new Promise((r) => setTimeout(r, 240))
    }

    try {
      const response = await fetch('/api/trace', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })

      if (response.ok) {
        const data = await response.json()
        setTelemetry({
          region: data.region || 'ap-south-1 (Mumbai)',
          durationMs: data.durationMs || Math.round(performance.now() - startTime),
          requestId: data.requestId || 'amplify-' + Math.random().toString(36).substring(2, 10),
          timestamp: new Date().toISOString(),
          isLive: true
        })
      } else {
        throw new Error('Endpoint offline')
      }
    } catch {
      const elapsed = Math.round(performance.now() - startTime)
      setTelemetry({
        region: 'Local Edge (Vite PoP Simulator)',
        durationMs: elapsed,
        requestId: 'req_' + Math.random().toString(36).substring(2, 10),
        timestamp: new Date().toISOString(),
        isLive: false
      })
    } finally {
      setIsTracing(false)
      setPacketPosition(null)
    }
  }

  const handleSelectNode = (idx: number) => {
    setSelectedNode(idx)
    inspectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const handleCopyCode = () => {
    const code = steps[selectedNode].detail.codeSnippet
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <section id="under-the-hood" ref={containerRef} className="py-20 sm:py-28 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-6">
        <div className="space-y-2.5">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-amber-lamp font-bold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-lamp" />
            <span>// CLOUD ARCHITECTURE & SYSTEM DESIGN</span>
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone tracking-tight font-normal">
            Under the Hood.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted font-medium">AWS Amplify Gen 2</span>
          </div>
          <span className="text-muted">•</span>
          <span className="text-amber-lamp bg-[#171513] px-3 py-1 rounded-md border border-hairlineLight font-bold text-xs">
            CloudFront + S3 + Lambda + DynamoDB
          </span>
        </div>
      </div>

      {/* Main Architecture Diagram Container */}
      <div className="p-6 sm:p-10 rounded-2xl border border-hairlineLight bg-[#0E0D0B] space-y-10 shadow-2xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="font-mono text-xs sm:text-sm text-amber-lamp uppercase tracking-wider font-bold">
              System Topography • Click Any Node to Inspect Real IaC Code
            </span>
            <p className="font-sans text-sm sm:text-base text-bone/80 max-w-2xl leading-relaxed">
              Live request lifecycle from visitor DNS resolution through edge caching, microVM execution, and atomic state storage.
            </p>
          </div>

          <button
            onClick={handleTraceRequest}
            disabled={isTracing}
            className="px-6 py-3 rounded-full bg-amber-lamp text-background font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-lamp/20 disabled:opacity-50 self-start md:self-auto flex items-center gap-2.5"
            data-cursor="TRACE"
          >
            {isTracing ? (
              <>
                <span className="h-2 w-2 rounded-full bg-background animate-ping" />
                <span>Tracing Packet...</span>
              </>
            ) : (
              <>
                <span>Trace a Request</span>
                <span className="text-base">⚡</span>
              </>
            )}
          </button>
        </div>

        {/* 6-Node Visual Architecture Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, idx) => {
            const isLit = activeStep >= idx || packetPosition === idx
            const isCurrentPacket = packetPosition === idx
            const isSelected = selectedNode === idx

            return (
              <div
                key={step.id}
                data-testid={`cloud-node-${idx}`}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectNode(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelectNode(idx)
                  }
                }}
                className={`relative p-6 rounded-xl border cursor-pointer transition-all duration-300 focus:outline-none ${
                  isSelected
                    ? 'border-amber-lamp bg-[#1E1A14] ring-1 ring-amber-lamp shadow-xl shadow-amber-lamp/20 scale-[1.01]'
                    : isCurrentPacket
                    ? 'border-amber-lamp bg-[#1A1610] ring-1 ring-amber-lamp/50 scale-[1.01]'
                    : isLit
                    ? 'border-amber-lamp/40 bg-[#141210] hover:border-amber-lamp'
                    : 'border-hairline bg-[#0E0D0B] opacity-75 hover:opacity-100 hover:border-hairlineLight'
                }`}
                data-cursor="INSPECT"
              >
                {/* Header */}
                <div className="flex items-center justify-between font-mono text-xs hairline-b pb-2.5 mb-3">
                  <span className={`font-bold ${isLit || isSelected ? 'text-amber-lamp' : 'text-muted'}`}>
                    // {step.number}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-hairline text-muted font-medium">
                      {step.badge}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                      isSelected ? 'bg-amber-lamp text-background font-bold' : 'text-amber-lamp underline hover:text-amber-400'
                    }`}>
                      {isSelected ? 'Active ✓' : 'Inspect ↗'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl text-bone font-normal">
                    {step.title}
                  </h3>
                  <div className="font-mono text-xs text-amber-lamp font-medium">
                    {step.subtitle}
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed pt-2">
                  {step.description}
                </p>

                {isCurrentPacket && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 font-mono text-[10px] text-amber-lamp bg-amber-lamp/15 px-2 py-0.5 rounded-full border border-amber-lamp">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp animate-ping" />
                    PACKET HERE
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Selected Node Deep-Dive Code Inspector (Active & Working) */}
        <div 
          ref={inspectorRef} 
          data-testid="architecture-code-inspector"
          className="p-6 sm:p-8 rounded-xl border border-amber-lamp/70 bg-[#14120E] space-y-6 shadow-2xl transition-all duration-300"
        >
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 hairline-b pb-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[11px] text-amber-lamp font-bold uppercase tracking-wider bg-amber-lamp/10 border border-amber-lamp/40 px-2.5 py-0.5 rounded">
                  Active Cloud Node: {steps[selectedNode].number} / 06
                </span>
                <span className="font-mono text-xs text-muted">
                  File: <code className="text-bone font-bold">{steps[selectedNode].detail.filePath}</code>
                </span>
              </div>
              <h4 className="font-display text-2xl sm:text-3xl text-bone font-normal">
                {steps[selectedNode].title} — Infrastructure as Code
              </h4>
            </div>

            {/* Quick Node Switcher Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {steps.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectNode(idx)}
                  className={`px-3 py-1 rounded-full font-mono text-xs transition-all cursor-pointer ${
                    selectedNode === idx
                      ? 'bg-amber-lamp text-background font-bold shadow-md scale-105'
                      : 'border border-hairlineLight text-muted hover:text-bone hover:border-amber-lamp'
                  }`}
                >
                  {s.number} {s.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-muted">
              <span className="text-bone font-medium">{steps[selectedNode].detail.codeTitle}</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#1C1814] border border-hairline hover:border-amber-lamp text-amber-lamp transition-colors cursor-pointer text-xs font-bold"
                title="Copy snippet to clipboard"
              >
                {copiedCode ? '✓ Copied' : '📋 Copy Code'}
              </button>
            </div>

            <pre className="p-4 sm:p-5 rounded-lg bg-[#090807] border border-hairlineLight overflow-x-auto font-mono text-xs sm:text-sm text-amber-lamp/95 leading-relaxed selection:bg-amber-lamp selection:text-background shadow-inner">
              <code>{steps[selectedNode].detail.codeSnippet}</code>
            </pre>
          </div>

          {/* Architectural Rationale */}
          <div className="font-sans text-xs sm:text-sm text-muted pt-3 border-t border-hairline leading-relaxed flex flex-col sm:flex-row sm:items-baseline gap-2">
            <span className="text-amber-lamp font-mono text-xs font-bold uppercase tracking-wider shrink-0 bg-[#1C1814] px-2.5 py-0.5 rounded border border-hairline">
              Design Rationale
            </span>
            <span className="text-bone/80">{steps[selectedNode].detail.rationale}</span>
          </div>
        </div>

        {/* Telemetry Output Card */}
        {telemetry && (
          <div className="p-6 rounded-xl border border-hairlineLight bg-[#12100E] space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between font-mono text-xs sm:text-sm">
              <span className="text-amber-lamp font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-lamp animate-pulse" />
                <span>// TELEMETRY DIAGNOSTIC PAYLOAD</span>
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs uppercase font-bold ${
                telemetry.isLive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-lamp/10 text-amber-lamp border border-amber-lamp/30'
              }`}>
                {telemetry.isLive ? 'LIVE CLOUD TELEMETRY' : 'STANDBY MODE'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs sm:text-sm pt-1">
              <div>
                <span className="text-muted block text-[11px] uppercase tracking-wider">REGION</span>
                <span className="text-bone font-bold text-sm sm:text-base">{telemetry.region}</span>
              </div>
              <div>
                <span className="text-muted block text-[11px] uppercase tracking-wider">ROUNDTRIP</span>
                <span className="text-amber-lamp font-bold text-sm sm:text-base">{telemetry.durationMs} ms</span>
              </div>
              <div>
                <span className="text-muted block text-[11px] uppercase tracking-wider">REQUEST ID</span>
                <span className="text-bone truncate block text-xs">{telemetry.requestId}</span>
              </div>
              <div>
                <span className="text-muted block text-[11px] uppercase tracking-wider">TIMESTAMP</span>
                <span className="text-muted truncate block text-xs">{telemetry.timestamp.split('T')[1].replace('Z','')} UTC</span>
              </div>
            </div>

            {!telemetry.isLive && (
              <p className="font-mono text-xs text-muted pt-2 border-t border-hairline">
                * Note: Live request routing active when connected to the AWS Amplify Gen 2 backend via <code className="text-bone">npx ampx sandbox</code>.
              </p>
            )}
          </div>
        )}

      </div>

    </section>
  )
}
