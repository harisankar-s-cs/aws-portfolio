import React, { useState, useEffect, useRef } from 'react'
import {
  Code2,
  Cpu,
  Layers,
  GraduationCap,
  Award,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Cloud,
  Eye,
  Activity,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Database,
  Brain,
  Sliders,
  X,
  Volume2,
  VolumeX,
  Zap,
  Flame,
  Binary,
  HelpCircle
} from 'lucide-react'
import confetti from 'canvas-confetti'

// Web Audio API Synthesizer (Zero external audio files needed!)
const playSoundEffect = (type = 'click', soundEnabled = true) => {
  if (!soundEnabled) return
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime

    if (type === 'warp') {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(140, now)
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.25)
      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25)
      osc.start(now)
      osc.stop(now + 0.25)
    } else if (type === 'pop') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15)
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
      osc.start(now)
      osc.stop(now + 0.15)
    } else {
      // Short tactile mechanical click
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(800, now)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
      osc.start(now)
      osc.stop(now + 0.04)
    }
  } catch (e) {
    // AudioContext blocked or not supported
  }
}

export default function App() {
  // Mode: false = Polished Resume, true = Real 2 AM Engineering Mode
  const [realityMode, setRealityMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [showArchitectureModal, setShowArchitectureModal] = useState(false)

  // Interactive Denoising Lab State
  const [noiseLevel, setNoiseLevel] = useState(65)
  const [patchSize, setPatchSize] = useState(256)
  const canvasRef = useRef(null)

  const toggleRealityMode = () => {
    const next = !realityMode
    setRealityMode(next)
    playSoundEffect('warp', soundEnabled)

    if (next) {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.8 },
        colors: ['#f59e0b', '#ef4444', '#ec4899']
      })
    } else {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#3b82f6', '#10b981']
      })
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('harisankar.s.cs@gmail.com')
    setCopiedEmail(true)
    playSoundEffect('pop', soundEnabled)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  // Draw interactive simulation on the canvas representing Harisankar's NIT Calicut Restormer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    // Draw background synthetic anatomical ultrasound tissue simulation
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, 140)
    gradient.addColorStop(0, '#38bdf8')
    gradient.addColorStop(0.4, '#1e293b')
    gradient.addColorStop(1, '#020617')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw distinct tissue contour lines
    ctx.strokeStyle = '#38bdf8'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, 60, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = '#f43f5e'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.ellipse(width / 2 - 20, height / 2 + 10, 35, 20, Math.PI / 4, 0, Math.PI * 2)
    ctx.stroke()

    // Add noise layer based on noiseLevel slider
    const imgData = ctx.getImageData(0, 0, width, height)
    const data = imgData.data
    const noiseFactor = noiseLevel / 100

    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < noiseFactor) {
        const speckle = (Math.random() - 0.5) * 255 * noiseFactor
        data[i] = Math.min(255, Math.max(0, data[i] + speckle))
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + speckle))
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + speckle))
      }
    }
    ctx.putImageData(imgData, 0, 0)

    // Draw Patch Boundary Grid overlay
    ctx.strokeStyle = realityMode ? 'rgba(245, 158, 11, 0.4)' : 'rgba(56, 189, 248, 0.4)'
    ctx.lineWidth = 1
    const step = patchSize === 128 ? 32 : patchSize === 256 ? 64 : 96
    for (let x = 0; x < width; x += step) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
  }, [noiseLevel, patchSize, realityMode])

  // Calculated metrics
  const calculatedPSNR = (42 - (noiseLevel * 0.22)).toFixed(2)
  const calculatedSSIM = (0.99 - (noiseLevel * 0.005)).toFixed(3)

  return (
    <div className={`min-h-screen transition-colors duration-700 ${
      realityMode 
        ? 'bg-[#0c0a09] text-amber-100 selection:bg-amber-500 selection:text-black font-sans' 
        : 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white font-sans'
    }`}>
      
      {/* Background Ambience Glow */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ${
        realityMode ? 'opacity-30' : 'opacity-20'
      }`}>
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] ${
          realityMode ? 'bg-amber-600/30' : 'bg-cyan-600/30'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${
          realityMode ? 'bg-rose-600/20' : 'bg-blue-600/20'
        }`} />
      </div>

      {/* Sticky Top Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-500 ${
        realityMode ? 'bg-[#0c0a09]/85 border-amber-900/50' : 'bg-slate-950/85 border-slate-800/80'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base transition-transform group-hover:scale-105 shadow-md ${
              realityMode 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-amber-500/10' 
                : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-cyan-500/10'
            }`}>
              {realityMode ? <Flame className="w-5 h-5 text-amber-400 animate-pulse" /> : 'H'}
            </div>
            <div>
              <span className="font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Harisankar S
              </span>
              <span className={`block text-[10px] font-mono leading-none transition-colors ${
                realityMode ? 'text-amber-400' : 'text-slate-400'
              }`}>
                {realityMode ? '🔥 2 AM Engineering Mode' : '👔 Corporate Polish'}
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#simulator" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-cyan-400 font-semibold">
              <Zap className="w-3.5 h-3.5" /> Interactive Lab
            </a>
            <a href="#research" className="hover:text-cyan-400 transition-colors">Research</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#superpowers" className="hover:text-cyan-400 transition-colors">Superpowers</a>
          </nav>

          {/* Controls: Audio Toggle & The Reality Dial */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled)
                playSoundEffect('click', !soundEnabled)
              }}
              className={`p-2 rounded-lg border transition-colors ${
                soundEnabled 
                  ? 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/30' 
                  : 'text-slate-500 border-slate-800 bg-slate-900 hover:text-slate-400'
              }`}
              title={soundEnabled ? 'Synthesizer Audio Enabled' : 'Audio Muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* The Reality Mode Switcher (Visible Hint) */}
            <button
              onClick={toggleRealityMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-lg ${
                realityMode
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 border-amber-400 shadow-amber-500/30 ring-2 ring-amber-400/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border-cyan-500/40 hover:border-cyan-400 shadow-cyan-950/40'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${realityMode ? 'animate-bounce' : 'text-cyan-400'}`} />
              <span>{realityMode ? 'Reality: 2 AM Mode' : 'Toggle Reality Dial'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Prominent Visible Hint Banner (Required by Hackathon Rubric) */}
      <div className={`py-2 px-4 text-center text-xs border-b transition-colors relative z-10 ${
        realityMode
          ? 'bg-amber-950/60 border-amber-800/60 text-amber-300'
          : 'bg-gradient-to-r from-cyan-950/50 via-slate-900 to-blue-950/50 border-cyan-900/40 text-cyan-300'
      }`}>
        <span className="inline-flex items-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <strong>Interactive Feature Hint:</strong> Flip the
          <button
            onClick={toggleRealityMode}
            className="underline font-bold hover:text-white cursor-pointer px-1 py-0.5 rounded transition-all bg-white/10"
          >
            "Reality Dial"
          </button>
          to switch between polished resume text and unfiltered engineering truths, or test the
          <a href="#simulator" className="underline font-bold hover:text-white ml-1">
            Live Denoising Lab
          </a> below!
        </span>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-24 relative z-10">

        {/* Hero Section */}
        <section className="pt-6 sm:pt-10 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-6 text-center md:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
              realityMode 
                ? 'bg-amber-950/60 border-amber-700/60 text-amber-300' 
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}>
              <span className={`w-2 h-2 rounded-full ${realityMode ? 'bg-amber-400 animate-ping' : 'bg-cyan-400'}`} />
              Final Year B.Tech CSE • TKM College of Engineering, Kollam
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {realityMode ? (
                <>
                  I Turn <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-red-500 bg-clip-text text-transparent">CUDA Chaos</span> into Working Vision Models.
                </>
              ) : (
                <>
                  Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Harisankar S</span>
                </>
              )}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              {realityMode ? (
                <>
                  Deep Learning researcher who survived 26M-parameter Restormer training on NVIDIA H200 clusters, 
                  misaligned satellite GIS grids, and competitive mental arithmetic. Chairperson of ACM TKMCE.
                </>
              ) : (
                <>
                  Deep Learning Researcher & Computer Science undergraduate specializing in 
                  <span className="text-cyan-400 font-medium"> Vision Transformers</span>, 
                  <span className="text-sky-300 font-medium"> Ultrasound Image Denoising</span>, and 
                  <span className="text-blue-400 font-medium"> Geospatial Satellite Vision</span>.
                </>
              )}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
              <a
                href="#simulator"
                className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${
                  realityMode
                    ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/25'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25'
                }`}
                onClick={() => playSoundEffect('pop', soundEnabled)}
              >
                <span>Launch Interactive Lab</span>
                <Zap className="w-4 h-4" />
              </a>

              <button
                onClick={toggleRealityMode}
                className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold transition-all flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>{realityMode ? 'Switch to Polished Mode' : 'Reveal Unfiltered Reality'}</span>
              </button>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-cyan-400">8.90</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">TKMCE CGPA</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-sky-400">37.39 dB</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">NIT Restormer PSNR</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-amber-400">National 2nd</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Abacus Arithmetic</div>
              </div>
            </div>
          </div>

          {/* Quick Origin Badge Card */}
          <div className="md:col-span-4 flex justify-center">
            <div className={`w-full max-w-sm p-6 rounded-2xl border transition-all duration-500 relative ${
              realityMode 
                ? 'bg-gradient-to-b from-amber-950/40 to-slate-900/90 border-amber-600/50 shadow-2xl shadow-amber-950/50' 
                : 'bg-slate-900/80 border-slate-800 shadow-xl'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ${
                  realityMode 
                    ? 'bg-gradient-to-tr from-amber-500 to-rose-600' 
                    : 'bg-gradient-to-tr from-cyan-500 to-blue-600'
                }`}>
                  HS
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Harisankar S</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Thiruvananthapuram, Kerala
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Current Focus</span>
                  <span className="font-bold text-white">Vision Transformers & Edge CNN</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Community</span>
                  <span className="font-bold text-cyan-400">ACM Chapter Chairperson</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Cloud Target</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Cloud className="w-3.5 h-3.5" /> AWS Amplify + CloudFront
                  </span>
                </div>
              </div>

              <div className={`mt-4 p-3 rounded-xl text-[11px] leading-relaxed border ${
                realityMode 
                  ? 'bg-amber-950/50 border-amber-800/60 text-amber-200' 
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                {realityMode ? (
                  <>💡 <strong>Secret Superpower:</strong> Because of competitive Abacus training, I don't use calculators for tensor broadcast shapes. It saves 100+ lines of debugging.</>
                ) : (
                  <>🎯 <strong>Mission:</strong> Building reproducible, high-throughput deep vision models that solve real healthcare and geospatial problems.</>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 🌟 THE CREATIVE FEATURE: Interactive Denoising & Tensor Simulator */}
        <section id="simulator" className={`p-6 sm:p-10 rounded-3xl border transition-all duration-500 relative overflow-hidden ${
          realityMode 
            ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-black border-amber-500/50 shadow-2xl' 
            : 'bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900 border-cyan-800/40 shadow-xl'
        }`}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                Interactive Feature: NIT Calicut Restormer Simulator
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Simulate Ultrasound Denoising in Real Time
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                At <strong>NIT Calicut</strong>, I engineered a 26M-parameter Hybrid Restormer to eliminate speckle noise in musculoskeletal ultrasound without losing tissue boundaries. 
                <strong> Adjust the sliders below to test how patch-size curriculum and denoising affect image fidelity:</strong>
              </p>

              {/* Slider 1: Noise Level */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Input Speckle Noise Dissipation</span>
                  <span className="text-cyan-400 font-mono font-bold">{100 - noiseLevel}% Denoised</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="90"
                  value={noiseLevel}
                  onChange={(e) => {
                    setNoiseLevel(Number(e.target.value))
                    playSoundEffect('click', soundEnabled)
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Raw Ultrasound (Heavy Speckle)</span>
                  <span>Restormer Filtered</span>
                </div>
              </div>

              {/* Buttons: Progressive Patch-size Curriculum */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Progressive Patch-Size Curriculum</span>
                  <span className="text-sky-400 font-mono font-bold">{patchSize} × {patchSize} px</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[128, 256, 384].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setPatchSize(size)
                        playSoundEffect('pop', soundEnabled)
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-bold font-mono transition-all border ${
                        patchSize === size
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                      }`}
                    >
                      {size}px Patch
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics Live Display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Synthetic PSNR (Fidelity)</div>
                  <div className="text-xl font-bold font-mono text-cyan-400">{calculatedPSNR} dB</div>
                  <div className="text-[10px] text-slate-500">Benchmark: 37.39 dB</div>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Structural SSIM</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">{calculatedSSIM}</div>
                  <div className="text-[10px] text-slate-500">Benchmark: 0.953</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Canvas Rendering */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-3">
              <div className="relative p-2 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={280}
                  className="rounded-xl border border-slate-800 cursor-crosshair"
                />
                <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                  Interactive Wavelet Plane
                </div>
              </div>
              <p className="text-[11px] text-slate-400 text-center max-w-xs">
                Live HTML5 Canvas simulation visualizing spatial-frequency boundary retention during transformer denoising.
              </p>
            </div>

          </div>
        </section>

        {/* Core Section 1: About Me */}
        <section id="about" className="space-y-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">About My Journey</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              {realityMode ? (
                <>
                  <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-2">
                    // The Unvarnished Truth
                  </div>
                  <p>
                    I didn’t get into machine learning through a hype tutorial. In school, I spent hours practicing 
                    mental arithmetic, eventually winning <strong>National 2nd Runner-Up</strong>. That taught me to visualize 
                    multi-dimensional matrices in my head before I ever touched PyTorch.
                  </p>
                  <p>
                    When I joined <strong>TKM College of Engineering</strong>, I wanted to apply that mathematical instinct 
                    to the hardest problems I could find. At <strong>NIT Calicut</strong>, I lived through 2 AM GPU memory crashes, 
                    broken CUDA kernels, and hyperparameter divergence until our 26M-parameter Restormer beat every benchmark on ultrasound denoising.
                  </p>
                  <p>
                    Now as <strong>Chairperson of the ACM Student Chapter</strong>, I love demystifying these systems for younger students—showing them that underneath all the buzzwords, AI is just creative math, disciplined engineering, and relentless grit.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I am a final-year Computer Science & Engineering undergraduate at <strong>TKM College of Engineering, Kollam</strong> (CGPA 8.90). 
                    My technical path combines rigorous mathematical foundations with applied deep learning research in medical imaging and satellite vision.
                  </p>
                  <p>
                    During research internships at <strong>NIT Calicut</strong> and <strong>KSREC</strong>, I designed and trained specialized Vision Transformers, 
                    focusing on noise dissipation, edge-aware loss formulations, and high-accuracy pixel-level change detection on NVIDIA H200 GPU infrastructure.
                  </p>
                  <p>
                    In addition to research, I serve as <strong>Chairperson of the ACM Student Chapter at TKMCE</strong>, directing technical workshops, 
                    hackathons, and peer-learning initiatives across the campus.
                  </p>
                </>
              )}
            </div>

            {/* Abacus & Quirk Card */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-colors ${
              realityMode 
                ? 'bg-amber-950/20 border-amber-800/40 text-amber-100' 
                : 'bg-cyan-950/20 border-cyan-800/40 text-cyan-100'
            }`}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <Binary className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Mental Math to Neural Nets</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Secured <strong>National 2nd Runner-Up</strong> & <strong>Kerala State 1st Runner-Up</strong> in competitive mental arithmetic. 
                  High-speed calculation built my instinct for algorithmic time complexity and tensor dimensional alignment.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> National Abacus Laureate
              </div>
            </div>
          </div>
        </section>

        {/* Core Section 2: Research & Experience */}
        <section id="research" className="space-y-6">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Research Experience</h2>
          </div>

          <div className="space-y-6">
            
            {/* NIT Calicut Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
              realityMode 
                ? 'bg-[#0f0d0c] border-amber-500/40 hover:border-amber-400' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">National Institute of Technology Calicut (NIT Calicut)</h3>
                  <p className="text-sm text-cyan-400 font-medium">Deep Learning Research Intern • Dept. of Computer Science & Engineering</p>
                </div>
                <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full w-fit">
                  May 2026 – Jul 2026 • Calicut, Kerala
                </span>
              </div>

              {realityMode ? (
                <div className="space-y-2 text-sm text-amber-200/90 leading-relaxed">
                  <p>
                    ⚡ <strong>The 2 AM Reality:</strong> Standard Restormers obliterated fine diagnostic tissue edges because generic L1 loss treats all pixels identically. We rewrote the loss function to penalize wavelet-domain high-frequency boundary loss, saving tissue margins on ultrasound scans while dropping GPU training hours by 34%.
                  </p>
                </div>
              ) : (
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside leading-relaxed">
                  <li>
                    Developed a <strong>Wavelet Dual-Stream Hybrid Restormer</strong>—a 26M-parameter Vision Transformer combined with a custom EdgeCNN to eliminate ultrasound speckle noise while preserving diagnostic tissue boundaries.
                  </li>
                  <li>
                    Designed a custom <strong>Edge-Aware L1 loss function</strong> and progressive patch-size training curriculum (128px → 384px) to prioritize structural fidelity over generic image smoothing.
                  </li>
                  <li>
                    Achieved <strong>37.39 dB PSNR and 0.953 SSIM</strong> on musculoskeletal ultrasound datasets with 95.5% noise dissipation; reduced training time by 34% using PyTorch on NVIDIA H200 GPUs.
                  </li>
                </ul>
              )}
            </div>

            {/* KSREC Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
              realityMode 
                ? 'bg-[#0f0d0c] border-amber-500/40 hover:border-amber-400' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Kerala State Remote Sensing and Environment Centre (KSREC)</h3>
                  <p className="text-sm text-sky-400 font-medium">Deep Learning / Computer Vision Intern</p>
                </div>
                <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full w-fit">
                  Jun 2025 – Jul 2025 • Thiruvananthapuram, Kerala
                </span>
              </div>

              {realityMode ? (
                <div className="space-y-2 text-sm text-amber-200/90 leading-relaxed">
                  <p>
                    ⚡ <strong>The 2 AM Reality:</strong> Bi-temporal satellite images change drastically between wet and dry seasons even without human construction. Building a differential feature fusion decoder helped the SwinV2 network ignore seasonal foliage shifts and pinpoint true urban development with 96.9% accuracy.
                  </p>
                </div>
              ) : (
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside leading-relaxed">
                  <li>
                    Built a <strong>Siamese Swin Transformer</strong> (SwinV2-Tiny backbone) with differential feature fusion and a convolutional decoder for pixel-level land-use change detection from bi-temporal satellite imagery.
                  </li>
                  <li>
                    Achieved <strong>96.9% pixel accuracy</strong> and an F1-score of 0.695 on the LEVIR-CD benchmark (637 image pairs, 0.5m resolution); implemented the complete training pipeline in PyTorch.
                  </li>
                  <li>
                    Proposed an integration workflow for KSREC’s GIS systems to automate urban expansion tracking and environmental change detection across Kerala.
                  </li>
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Core Section 3: Flagship Projects */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Key Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Project 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800/50">
                    Satellite Vision
                  </span>
                  <a href="https://github.com/harisankar-s-cs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Geospatial Change Detection System</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {realityMode 
                    ? "Trained Siamese Swin Transformer to detect illegal land reclamation and deforestation across Kerala from multi-spectral imagery." 
                    : "End-to-end satellite image change detection pipeline using a Siamese Swin Transformer architecture for automated land administration."}
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Python', 'PyTorch', 'Swin Transformer', 'LEVIR-CD', 'OpenCV'].map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-sky-400 bg-sky-950 px-2.5 py-1 rounded-full border border-sky-800/50">
                    Full-Stack Java
                  </span>
                  <a href="https://github.com/harisankar-s-cs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Hop On – Cab Booking Application</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {realityMode 
                    ? "Built a concurrent desktop platform with rider/driver state machines. Solved nasty race conditions where two riders tried hailing the same cab at the exact same millisecond." 
                    : "Multi-module desktop cab booking platform engineered in Java. Built separate workflows for riders and drivers with real-time fare calculation and JavaFX interface."}
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Java', 'JavaFX', 'OOP Architecture', 'Concurrency', 'Auth'].map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Core Section 4: Skills & Superpowers */}
        <section id="superpowers" className="space-y-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Skills & Tech Superpowers</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-sm font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Languages
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'Java', 'C', 'JavaScript', 'HTML5', 'CSS3'].map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-sm font-bold text-sky-400 mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4" /> ML & Vision
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['PyTorch', 'Vision Transformers', 'Restormer', 'Swin Transformer', 'CNNs', 'Wavelets', 'Segmentation'].map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Tools & Libraries
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['NumPy', 'OpenCV', 'Albumentations', 'BasicSR', 'JavaFX', 'Git', 'Linux'].map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <Cloud className="w-4 h-4" /> Cloud & Core CS
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['AWS Amplify', 'CloudFront', 'Data Structures', 'Algorithms', 'OS', 'DBMS', 'Networks'].map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AWS Architecture & Cloud Proof Section */}
        <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              AWS Amplify Hosted
            </div>
            <h3 className="text-xl font-bold text-white">Live AWS Architecture & Deployment</h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Connected directly to GitHub with automated CI/CD builds on AWS Amplify Hosting, distributed via Amazon CloudFront global edge caches.
            </p>
          </div>

          <button
            onClick={() => {
              setShowArchitectureModal(true)
              playSoundEffect('pop', soundEnabled)
            }}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all border border-slate-700 flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Cloud className="w-4 h-4 text-cyan-400" />
            <span>View AWS Architecture Specs</span>
          </button>
        </section>

        {/* Contact / Footer */}
        <section id="contact" className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <div>
            <p className="font-semibold text-white">Harisankar S</p>
            <p className="text-xs mt-0.5">B.Tech Computer Science & Engineering • TKM College of Engineering, Kollam</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={copyEmail}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{copiedEmail ? 'Copied to Clipboard!' : 'harisankar.s.cs@gmail.com'}</span>
            </button>

            <a
              href="https://github.com/harisankar-s-cs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/harisankar-s-0741b22a4"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      {/* Floating Sticky Quick Action: Reality Dial */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={toggleRealityMode}
          className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold text-xs shadow-2xl transition-all cursor-pointer border ${
            realityMode 
              ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-black border-amber-300 ring-4 ring-amber-400/30' 
              : 'bg-slate-900/95 hover:bg-slate-800 text-cyan-400 border-cyan-500/50 hover:border-cyan-400 backdrop-blur'
          }`}
        >
          <Zap className="w-4 h-4 animate-bounce" />
          <span>{realityMode ? 'Reality: ON (2 AM Mode)' : '⚡ Flip Reality Dial'}</span>
        </button>
      </div>

      {/* AWS Architecture Modal */}
      {showArchitectureModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Cloud className="w-5 h-5" />
                <span>AWS Live Deployment Specs & CI/CD</span>
              </div>
              <button 
                onClick={() => setShowArchitectureModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300">
              <div className="text-cyan-400 font-bold">// 1. Continuous Deployment Pipeline</div>
              <p>Git Commit ➔ GitHub (harisankar-s-cs/aws-portfolio) ➔ AWS Amplify Webhook ➔ Automated Build Container</p>

              <div className="text-cyan-400 font-bold pt-2">// 2. Global Edge Distribution</div>
              <p>Amplify Hosting ➔ Amazon CloudFront (Global CDN Points of Presence) ➔ Route 53 DNS ➔ Visitor Browser</p>

              <div className="text-cyan-400 font-bold pt-2">// 3. Performance & Security Metrics</div>
              <p>• Zero Cold-Starts: Static SPA compilation with Vite<br/>• Automated SSL: AWS Certificate Manager (ACM)<br/>• Cache-Control: Immutable asset hashing for instant reloads</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowArchitectureModal(false)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Close Specs
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
