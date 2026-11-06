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
  const [activeStep, setActiveStep] = useState(0)
  const [isTracing, setIsTracing] = useState(false)
  const [telemetry, setTelemetry] = useState<TraceTelemetry | null>(null)
  const [packetPosition, setPacketPosition] = useState<number | null>(null)

  const steps = [
    {
      id: 'visitor',
      number: '01',
      title: 'Visitor Request',
      subtitle: 'Client Browser',
      description: 'Encrypted TLS 1.3 request initiated with SNI routing to the nearest AWS Point of Presence.',
      badge: 'Edge Entry'
    },
    {
      id: 'cloudfront',
      number: '02',
      title: 'Amazon CloudFront',
      subtitle: 'Global CDN (600+ PoPs)',
      description: 'Terminates SSL at the edge, enforces cache control headers, and serves cached assets sub-20ms.',
      badge: 'PoP Cache'
    },
    {
      id: 's3',
      number: '03',
      title: 'Amplify Hosting (S3)',
      subtitle: 'Static SPA Storage',
      description: 'Origin bucket holds immutable hashed bundles, WebP depth maps, and self-hosted fonts with OAC security.',
      badge: 'Origin Store'
    },
    {
      id: 'apigw',
      number: '04',
      title: 'Lambda Function URL',
      subtitle: 'API Gateway / Auth',
      description: 'CORS-governed entry point with throttling and least-privilege IAM roles for dynamic telemetry.',
      badge: 'Compute Ingress'
    },
    {
      id: 'lambda',
      number: '05',
      title: 'AWS Lambda (Node.js/TS)',
      subtitle: 'Serverless Functions',
      description: 'Micro-execution environments running diagnostic tracer, atomic visitor counter, and contact dispatcher.',
      badge: 'MicroVM Firecracker'
    },
    {
      id: 'dynamo_sns',
      number: '06',
      title: 'DynamoDB & SNS',
      subtitle: 'Persistence & Fan-out',
      description: 'Single-digit millisecond atomic increment for hits, and asynchronous notification topics for inquiries.',
      badge: 'Managed Storage'
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

    // Step-by-step packet animation through the 6 nodes
    for (let i = 0; i < steps.length; i++) {
      setPacketPosition(i)
      await new Promise((r) => setTimeout(r, 260))
    }

    // Try calling the live backend endpoint if configured
    try {
      const response = await fetch('/api/trace', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })

      if (response.ok) {
        const data = await response.json()
        setTelemetry({
          region: data.region || 'ap-south-1',
          durationMs: data.durationMs || Math.round(performance.now() - startTime),
          requestId: data.requestId || 'amplify-' + Math.random().toString(36).substring(2, 10),
          timestamp: new Date().toISOString(),
          isLive: true
        })
      } else {
        throw new Error('Endpoint offline')
      }
    } catch {
      // Honest offline state
      const elapsed = Math.round(performance.now() - startTime)
      setTelemetry({
        region: 'Local / Pre-Deployment',
        durationMs: elapsed,
        requestId: 'req_offline_standby',
        timestamp: new Date().toISOString(),
        isLive: false
      })
    } finally {
      setIsTracing(false)
      setPacketPosition(null)
    }
  }

  return (
    <section id="under-the-hood" ref={containerRef} className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-amber-lamp">
            // CLOUD ARCHITECTURE
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-bone tracking-tight font-normal mt-2">
            Under the Hood.
          </h2>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted">AWS Amplify Gen 2</span>
          </div>
          <span className="text-muted">•</span>
          <span className="text-amber-lamp bg-[#171513] px-2.5 py-1 rounded border border-hairlineLight">
            CloudFront + S3 + Lambda
          </span>
        </div>
      </div>

      {/* Main Architecture Diagram Container */}
      <div className="p-8 sm:p-10 rounded-2xl border border-hairlineLight bg-[#0E0D0B] space-y-10 shadow-2xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">
              System Topography
            </span>
            <p className="font-sans text-sm text-bone/80">
              Request path from visitor ingress to serverless compute and atomic data stores.
            </p>
          </div>

          <button
            onClick={handleTraceRequest}
            disabled={isTracing}
            className="px-5 py-2.5 rounded-full bg-amber-lamp text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-lamp/20 disabled:opacity-50 self-start md:self-auto"
            data-cursor="TRACE"
          >
            {isTracing ? 'Tracing Packet...' : 'Trace a Request ⚡'}
          </button>
        </div>

        {/* 6-Node Visual Architecture Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, idx) => {
            const isLit = activeStep >= idx || packetPosition === idx
            const isCurrentPacket = packetPosition === idx

            return (
              <div
                key={step.id}
                className={`relative p-6 rounded-xl border transition-all duration-500 ${
                  isCurrentPacket
                    ? 'border-amber-lamp bg-[#1A1610] ring-2 ring-amber-lamp/50 scale-[1.02]'
                    : isLit
                    ? 'border-amber-lamp/40 bg-[#141210]'
                    : 'border-hairline bg-[#0E0D0B] opacity-60'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between font-mono text-xs hairline-b pb-3 mb-3">
                  <span className={`font-bold ${isLit ? 'text-amber-lamp' : 'text-muted'}`}>
                    // {step.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-hairline text-muted">
                    {step.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-xl text-bone font-normal">
                    {step.title}
                  </h3>
                  <div className="font-mono text-xs text-amber-lamp/80">
                    {step.subtitle}
                  </div>
                </div>

                <p className="font-sans text-xs text-muted leading-relaxed pt-3">
                  {step.description}
                </p>

                {isCurrentPacket && (
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 font-mono text-[9px] text-amber-lamp bg-amber-lamp/10 px-2 py-0.5 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp animate-ping" />
                    PACKET HERE
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Telemetry Output Card */}
        {telemetry && (
          <div className="p-6 rounded-xl border border-hairlineLight bg-[#12100E] space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-amber-lamp font-bold uppercase tracking-wider">
                // TELEMETRY DIAGNOSTIC PAYLOAD
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                telemetry.isLive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-lamp/10 text-amber-lamp border border-amber-lamp/30'
              }`}>
                {telemetry.isLive ? 'LIVE CLOUD TELEMETRY' : 'STANDBY MODE'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs pt-2">
              <div>
                <span className="text-muted block text-[10px]">REGION</span>
                <span className="text-bone font-bold">{telemetry.region}</span>
              </div>
              <div>
                <span className="text-muted block text-[10px]">ROUNDTRIP</span>
                <span className="text-amber-lamp font-bold">{telemetry.durationMs} ms</span>
              </div>
              <div>
                <span className="text-muted block text-[10px]">REQUEST ID</span>
                <span className="text-bone truncate block">{telemetry.requestId}</span>
              </div>
              <div>
                <span className="text-muted block text-[10px]">TIMESTAMP</span>
                <span className="text-muted truncate block">{telemetry.timestamp.split('T')[1].replace('Z','')} UTC</span>
              </div>
            </div>

            {!telemetry.isLive && (
              <p className="font-mono text-[11px] text-muted pt-2 border-t border-hairline">
                * Note: Live request routing active when connected to the AWS Amplify Gen 2 backend via <code className="text-bone">npx ampx sandbox</code>.
              </p>
            )}
          </div>
        )}

      </div>

    </section>
  )
}
