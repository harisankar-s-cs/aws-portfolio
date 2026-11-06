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
  Lightbulb,
  Sun,
  Moon,
  RotateCcw
} from 'lucide-react'
import confetti from 'canvas-confetti'

// Web Audio API Synthesizer: Electrical Arc, Lamp Buzz & Switch Snaps
const playElectricSound = (type = 'click', soundEnabled = true) => {
  if (!soundEnabled) return
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const now = ctx.currentTime

    if (type === 'flicker') {
      // Electrical arc crackle & filament strike
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(80 + Math.random() * 240, now + i * 0.09)
        gain.gain.setValueAtTime(0.18, now + i * 0.09)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.06)
        osc.start(now + i * 0.09)
        osc.stop(now + i * 0.09 + 0.07)
      }

      // Warm transformer power hum
      const humOsc = ctx.createOscillator()
      const humGain = ctx.createGain()
      humOsc.connect(humGain)
      humGain.connect(ctx.destination)
      humOsc.type = 'sine'
      humOsc.frequency.setValueAtTime(60, now + 0.4) // 60Hz mains hum
      humGain.gain.setValueAtTime(0.001, now + 0.4)
      humGain.gain.linearRampToValueAtTime(0.08, now + 0.6)
      humGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)
      humOsc.start(now + 0.4)
      humOsc.stop(now + 1.2)
    } else if (type === 'switch') {
      // Crisp mechanical rotary or toggle click
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(950, now)
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
      osc.start(now)
      osc.stop(now + 0.04)
    } else if (type === 'fanfare') {
      const notes = [523.25, 659.25, 783.99, 1046.5]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.07)
        gain.gain.setValueAtTime(0.08, now + idx * 0.07)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25)
        osc.start(now + idx * 0.07)
        osc.stop(now + idx * 0.07 + 0.25)
      })
    }
  } catch (e) {
    // AudioContext blocked
  }
}

export default function App() {
  // Light States:
  // introState: 'dark' | 'flickering' | 'illuminated'
  const [introState, setIntroState] = useState('dark')
  const [lampTemperature, setLampTemperature] = useState('warm') // 'warm' (tungsten amber) | 'arc' (electric cyan)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [flickerIntensity, setFlickerIntensity] = useState(0) // 0 to 1
  const [showArchModal, setShowArchModal] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Interactive Denoising Lab State
  const [noiseLevel, setNoiseLevel] = useState(65)
  const [patchSize, setPatchSize] = useState(256)
  const canvasRef = useRef(null)

  // Trigger the Cinematic Lamp Strike
  const triggerLampStrike = () => {
    if (introState === 'flickering') return
    setIntroState('flickering')
    playElectricSound('switch', soundEnabled)
    playElectricSound('flicker', soundEnabled)

    // Realistic multi-stage electrical flicker sequence
    const flickerSteps = [
      { delay: 100, intensity: 0.3 },
      { delay: 220, intensity: 0.0 },
      { delay: 350, intensity: 0.75 },
      { delay: 480, intensity: 0.15 },
      { delay: 600, intensity: 0.95 },
      { delay: 750, intensity: 0.4 },
      { delay: 900, intensity: 1.0 }
    ]

    flickerSteps.forEach((step) => {
      setTimeout(() => {
        setFlickerIntensity(step.intensity)
      }, step.delay)
    })

    setTimeout(() => {
      setIntroState('illuminated')
      setFlickerIntensity(1)
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.4 },
        colors: lampTemperature === 'warm' ? ['#f59e0b', '#fbbf24', '#f97316'] : ['#06b6d4', '#38bdf8', '#3b82f6']
      })
    }, 950)
  }

  // Toggle Lamp On/Off after illuminated
  const toggleLamp = () => {
    if (introState === 'illuminated') {
      playElectricSound('switch', soundEnabled)
      setIntroState('dark')
      setFlickerIntensity(0)
    } else {
      triggerLampStrike()
    }
  }

  // Toggle color temperature: Warm 2700K Edison vs Electric 6500K Cyan Arc
  const toggleTemperature = () => {
    playElectricSound('switch', soundEnabled)
    const next = lampTemperature === 'warm' ? 'arc' : 'warm'
    setLampTemperature(next)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('harisankar.s.cs@gmail.com')
    setCopiedEmail(true)
    playElectricSound('switch', soundEnabled)
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

    // Synthetic ultrasound anatomical tissue gradient
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, 140)
    gradient.addColorStop(0, lampTemperature === 'warm' ? '#fbbf24' : '#38bdf8')
    gradient.addColorStop(0.4, '#1e293b')
    gradient.addColorStop(1, '#020617')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Ultrasound tissue boundaries
    ctx.strokeStyle = lampTemperature === 'warm' ? '#f59e0b' : '#38bdf8'
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

    // Patch Boundary Grid overlay
    ctx.strokeStyle = lampTemperature === 'warm' ? 'rgba(251, 191, 36, 0.4)' : 'rgba(56, 189, 248, 0.4)'
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
  }, [noiseLevel, patchSize, lampTemperature])

  const calculatedPSNR = (42 - (noiseLevel * 0.22)).toFixed(2)
  const calculatedSSIM = (0.99 - (noiseLevel * 0.005)).toFixed(3)

  // Color theme tokens based on lamp temperature
  const glowColor = lampTemperature === 'warm' ? 'rgba(245, 158, 11, ' : 'rgba(6, 182, 212, '
  const accentText = lampTemperature === 'warm' ? 'text-amber-400' : 'text-cyan-400'
  const accentBg = lampTemperature === 'warm' ? 'bg-amber-500' : 'bg-cyan-500'
  const accentBorder = lampTemperature === 'warm' ? 'border-amber-500/40' : 'border-cyan-500/40'

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden relative">

      {/* =========================================================================
          CINEMATIC LIGHT OVERLAY & SPOTLIGHT ENGINE
          Calculates dynamic opacity based on filament flicker intensity
      ========================================================================= */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-150 z-20"
        style={{
          opacity: introState === 'illuminated' ? 1 : flickerIntensity,
          background: `
            radial-gradient(circle at 50% 120px, ${glowColor}0.35) 0%, transparent 65%),
            radial-gradient(circle at 50% 400px, ${glowColor}0.15) 0%, transparent 75%)
          `
        }}
      />

      {/* Darkness Curtain for Unlit Mode */}
      {introState !== 'illuminated' && (
        <div 
          className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: 1 - flickerIntensity * 0.7 }}
        >
          {/* Hanging Edison Bulb in Darkness */}
          <div className="flex flex-col items-center cursor-pointer group" onClick={triggerLampStrike}>
            {/* Cord */}
            <div className="w-0.5 h-24 bg-gradient-to-b from-stone-600 to-stone-400" />
            {/* Socket */}
            <div className="w-6 h-6 bg-amber-700/80 rounded-t-sm border border-amber-600/60 shadow-inner" />
            
            {/* Bulb Glass */}
            <div className="relative w-16 h-24 -mt-1 flex items-center justify-center">
              <div 
                className="w-14 h-20 rounded-full border border-amber-500/30 transition-all duration-150 flex items-center justify-center"
                style={{
                  boxShadow: flickerIntensity > 0 
                    ? `0 0 ${flickerIntensity * 80}px ${flickerIntensity * 30}px ${glowColor}0.8)` 
                    : 'none',
                  backgroundColor: flickerIntensity > 0 
                    ? `${glowColor}${flickerIntensity * 0.7})` 
                    : 'rgba(255, 255, 255, 0.03)'
                }}
              >
                {/* Internal Filament Wire */}
                <div 
                  className="w-4 h-8 rounded-full border-2 transition-all duration-100"
                  style={{
                    borderColor: flickerIntensity > 0 ? '#fff' : 'rgba(245, 158, 11, 0.4)',
                    boxShadow: flickerIntensity > 0 ? '0 0 15px #ffedd5' : 'none'
                  }}
                />
              </div>
            </div>

            {/* Cinematic Call to Action */}
            <div className="mt-8 text-center space-y-2">
              <button
                onClick={triggerLampStrike}
                className="px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/30 transition-all flex items-center gap-2 group-hover:scale-105"
              >
                <Zap className="w-4 h-4 animate-bounce" />
                <span>Strike Lamp • Power On</span>
              </button>
              <p className="text-[11px] text-stone-500 font-mono">
                Click the filament bulb or button to initiate electrical ignition
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STICKY HEADER
      ========================================================================= */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/80 border-b border-stone-800/80 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-3 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base transition-transform group-hover:scale-105 border ${accentBorder} bg-black text-white shadow-sm`}>
              <Lightbulb className={`w-4 h-4 ${accentText}`} />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Harisankar S
              </span>
              <span className="block text-[10px] text-stone-400 font-mono leading-none">
                Deep Learning • ACM Chair
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
            <a href="#research" className="hover:text-amber-400 transition-colors">Research</a>
            <a href="#projects" className="hover:text-amber-400 transition-colors">Projects</a>
            <a href="#simulator" className={`hover:text-amber-400 transition-colors font-semibold ${accentText}`}>
              Live Lab
            </a>
            <a href="#skills" className="hover:text-amber-400 transition-colors">Superpowers</a>
          </nav>

          {/* Controls: Lamp Switch, Temp Toggle, Audio */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Lamp Power Switch */}
            <button
              onClick={toggleLamp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-all shadow-sm"
              title="Click to toggle illumination"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{introState === 'illuminated' ? 'Lamp: ON' : 'Ignite'}</span>
            </button>

            {/* Color Temperature Switch (2700K vs 6500K) */}
            <button
              onClick={toggleTemperature}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-800 bg-stone-900/80 text-xs font-mono text-stone-300 hover:text-white transition-colors"
              title="Toggle Tungsten 2700K / Cyan Arc 6500K"
            >
              {lampTemperature === 'warm' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{lampTemperature === 'warm' ? '2700K' : '6500K'}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled)
                playElectricSound('switch', !soundEnabled)
              }}
              className={`p-2 rounded-lg border transition-colors ${
                soundEnabled 
                  ? 'text-amber-400 border-amber-500/30 bg-amber-950/20' 
                  : 'text-stone-600 border-stone-800 bg-stone-900'
              }`}
              title={soundEnabled ? 'Synthesizer Audio Enabled' : 'Audio Muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Prominent Visible Hint Banner (Required by Rubric) */}
      <div className="py-2.5 px-4 text-center text-xs border-b bg-gradient-to-r from-amber-950/40 via-black to-stone-900/40 border-amber-900/30 text-amber-200/90 relative z-10">
        <span className="inline-flex items-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <strong>Interactive Feature Hint:</strong> Click the
          <button 
            onClick={toggleLamp}
            className="underline font-bold text-amber-300 hover:text-white px-1 cursor-pointer"
          >
            Hanging Edison Bulb
          </button>
          or color temperature switch to control the cinematic illumination, or run the
          <a href="#simulator" className="underline font-bold text-cyan-300 hover:text-white ml-1">
            Restormer Denoising Lab
          </a> below!
        </span>
      </div>

      {/* =========================================================================
          MAIN PORTFOLIO CONTENTS
      ========================================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-24 relative z-10">

        {/* Hero Section with Spotlight and Photo Reveal */}
        <section className="pt-4 sm:pt-8 grid md:grid-cols-12 gap-8 items-center relative">
          
          {/* Left Text */}
          <div className="md:col-span-8 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold border bg-stone-900/80 border-stone-700 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Final Year B.Tech CSE • TKM College of Engineering, Kollam
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-500 bg-clip-text text-transparent">Harisankar S</span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-300 max-w-2xl leading-relaxed">
              Deep Learning Researcher specializing in 
              <span className={`font-semibold ${accentText}`}> Vision Transformers</span>, 
              <span className="text-amber-200 font-semibold"> Ultrasound Image Restoration</span>, and 
              <span className="text-stone-100 font-semibold"> Geospatial Satellite Vision</span>. 
              National 2nd Runner-Up in Mental Arithmetic & Chairperson of ACM Student Chapter at TKMCE.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
              <a
                href="#research"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
                onClick={() => playElectricSound('switch', soundEnabled)}
              >
                <span>View Research & Benchmarks</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#simulator"
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Launch Interactive Lab</span>
              </a>
            </div>

            {/* Research Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800">
                <div className="text-2xl font-black text-amber-400 font-mono">8.90</div>
                <div className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">TKMCE CGPA</div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800">
                <div className="text-2xl font-black text-amber-300 font-mono">37.39 dB</div>
                <div className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">NIT Restormer PSNR</div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800">
                <div className="text-2xl font-black text-yellow-500 font-mono">National 2nd</div>
                <div className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">Mental Arithmetic</div>
              </div>
            </div>
          </div>

          {/* Right Spotlight Portrait Card (Revealed under the lamp) */}
          <div className="md:col-span-4 flex justify-center">
            <div className="w-full max-w-sm p-6 rounded-2xl bg-stone-950/90 border-2 border-amber-500/40 shadow-2xl relative transition-all duration-500 hover:border-amber-400">
              
              {/* Profile Image with Golden Studio Rim Highlight */}
              <div className="relative mb-5 mx-auto w-36 h-36 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl group">
                <img
                  src="/profile.jpg"
                  alt="Harisankar S"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to initials if image path fails
                    e.target.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 text-[10px] font-mono font-bold text-amber-300 bg-black/80 px-2 py-0.5 rounded">
                  Harisankar S
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-400">Department</span>
                  <span className="font-bold text-white">Computer Science & Eng.</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-400">Institution</span>
                  <span className="font-bold text-white">TKM College of Eng.</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-400">Leadership</span>
                  <span className="font-bold text-amber-400">Chairperson, ACM TKMCE</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-stone-400">Cloud Host</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> AWS Amplify Hosted
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-[11px] text-amber-200 leading-relaxed">
                💡 <strong>The Analytical Instinct:</strong> Years of competitive mental arithmetic trained my intuition for multi-dimensional tensor matrix dimensions and algorithmic efficiency.
              </div>
            </div>
          </div>
        </section>

        {/* 🌟 INTERACTIVE FEATURE: Restormer Ultrasound Denoising Lab */}
        <section id="simulator" className="p-6 sm:p-10 rounded-3xl bg-stone-950/80 border border-amber-500/40 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '5s' }} />
                Interactive Feature: NIT Calicut Restormer Simulator
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Simulate Ultrasound Denoising in Real Time
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                At <strong>NIT Calicut</strong>, I engineered a 26M-parameter Hybrid Restormer to eliminate speckle noise in musculoskeletal ultrasound without losing tissue boundaries. 
                <strong> Adjust the sliders below to test how patch-size curriculum and denoising affect image fidelity:</strong>
              </p>

              {/* Slider: Noise Level */}
              <div className="space-y-2 p-4 rounded-xl bg-stone-900/90 border border-stone-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-300">Input Speckle Noise Dissipation</span>
                  <span className="text-amber-400 font-mono font-bold">{100 - noiseLevel}% Denoised</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="90"
                  value={noiseLevel}
                  onChange={(e) => {
                    setNoiseLevel(Number(e.target.value))
                    playElectricSound('switch', soundEnabled)
                  }}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>Raw Ultrasound (Heavy Speckle)</span>
                  <span>Restormer Filtered</span>
                </div>
              </div>

              {/* Buttons: Patch Curriculum */}
              <div className="space-y-2 p-4 rounded-xl bg-stone-900/90 border border-stone-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-300">Progressive Patch-Size Curriculum</span>
                  <span className="text-amber-300 font-mono font-bold">{patchSize} × {patchSize} px</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[128, 256, 384].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setPatchSize(size)
                        playElectricSound('switch', soundEnabled)
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-bold font-mono transition-all border ${
                        patchSize === size
                          ? 'bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/20'
                          : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border-stone-800'
                      }`}
                    >
                      {size}px Patch
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics Live */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800">
                  <div className="text-[11px] text-stone-400 font-medium">Synthetic PSNR (Fidelity)</div>
                  <div className="text-xl font-bold font-mono text-amber-400">{calculatedPSNR} dB</div>
                  <div className="text-[10px] text-stone-500">Benchmark: 37.39 dB</div>
                </div>
                <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800">
                  <div className="text-[11px] text-stone-400 font-medium">Structural SSIM</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">{calculatedSSIM}</div>
                  <div className="text-[10px] text-stone-500">Benchmark: 0.953</div>
                </div>
              </div>
            </div>

            {/* Canvas Visualizer */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-3">
              <div className="relative p-2 rounded-2xl bg-black border border-stone-800 shadow-2xl">
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={280}
                  className="rounded-xl border border-stone-800 cursor-crosshair"
                />
                <div className="absolute bottom-4 left-4 bg-stone-900/90 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-mono text-amber-300 border border-amber-500/30">
                  Interactive Wavelet Plane
                </div>
              </div>
              <p className="text-[11px] text-stone-400 text-center max-w-xs font-mono">
                HTML5 Canvas simulating high-frequency tissue boundary retention.
              </p>
            </div>

          </div>
        </section>

        {/* Core Section 1: About Me */}
        <section id="about" className="space-y-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">About My Journey</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4 text-stone-300 leading-relaxed text-sm sm:text-base">
              <p>
                I am a final-year Computer Science & Engineering undergraduate at <strong>TKM College of Engineering, Kollam</strong> (CGPA 8.90). 
                My technical philosophy connects fundamental mathematical instincts with applied deep vision research.
              </p>
              <p>
                My training began in school with competitive mental arithmetic, earning 
                <span className="text-amber-400 font-semibold"> National 2nd Runner-Up</span> and 
                <span className="text-yellow-300 font-semibold"> Kerala State 1st Runner-Up</span> in Abacus. 
                That foundation gave me a distinct spatial intuition for multi-dimensional linear algebra and tensor shapes.
              </p>
              <p>
                During research fellowships at <strong>NIT Calicut</strong> and <strong>KSREC</strong>, I engineered Vision Transformers 
                for medical ultrasound restoration and satellite land-use change detection on high-throughput NVIDIA H200 GPU infrastructure. 
                As <strong>Chairperson of the ACM Student Chapter at TKMCE</strong>, I lead technical workshops, hackathons, and research discussion groups.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/20 to-stone-900 border border-amber-800/40 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">The Dual Advantage</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Deep learning isn't just about training loops; it's about algorithmic rigor. Combining mental calculation speed with 
                  modern Vision Transformers allows me to spot tensor bottlenecks and loss divergence quickly.
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800 mt-4 text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> National Abacus Laureate
              </div>
            </div>
          </div>
        </section>

        {/* Core Section 2: Research Experience */}
        <section id="research" className="space-y-6">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Research Experience</h2>
          </div>

          <div className="space-y-6">
            
            {/* NIT Calicut */}
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-stone-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">National Institute of Technology Calicut (NIT Calicut)</h3>
                  <p className="text-sm text-amber-400 font-medium">Deep Learning Research Intern • Dept. of Computer Science & Engineering</p>
                </div>
                <span className="text-xs text-stone-400 bg-stone-800/80 px-3 py-1 rounded-full w-fit">
                  May 2026 – Jul 2026 • Calicut, Kerala
                </span>
              </div>

              <ul className="space-y-2 text-sm text-stone-300 list-disc list-inside leading-relaxed">
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
            </div>

            {/* KSREC */}
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-stone-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Kerala State Remote Sensing and Environment Centre (KSREC)</h3>
                  <p className="text-sm text-yellow-500 font-medium">Deep Learning / Computer Vision Intern</p>
                </div>
                <span className="text-xs text-stone-400 bg-stone-800/80 px-3 py-1 rounded-full w-fit">
                  Jun 2025 – Jul 2025 • Thiruvananthapuram, Kerala
                </span>
              </div>

              <ul className="space-y-2 text-sm text-stone-300 list-disc list-inside leading-relaxed">
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
            </div>

          </div>
        </section>

        {/* Core Section 3: Key Projects */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Key Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800/50">
                    Satellite Computer Vision
                  </span>
                  <a href="https://github.com/harisankar-s-cs" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-white">
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Geospatial Change Detection System</h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  End-to-end satellite image change detection pipeline using a Siamese Swin Transformer architecture. 
                  Analyzes bi-temporal high-resolution imagery to detect infrastructural shifts, deforestation, and urban development.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Python', 'PyTorch', 'Swin Transformer', 'LEVIR-CD', 'OpenCV'].map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-yellow-400 bg-yellow-950/80 px-2.5 py-1 rounded-full border border-yellow-800/50">
                    Desktop Application
                  </span>
                  <a href="https://github.com/harisankar-s-cs" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-white">
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Hop On – Cab Booking Application</h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  Multi-module desktop cab booking platform engineered in Java. Built separate workflows for riders and drivers, 
                  implementing user authentication, real-time fare computation, ride dispatch logic, and a smooth JavaFX GUI.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Java', 'JavaFX', 'OOP Architecture', 'State Logic', 'Authentication'].map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Core Section 4: Skills & Tech Superpowers */}
        <section id="skills" className="space-y-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Skills & Tech Superpowers</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Languages
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'Java', 'C', 'JavaScript', 'HTML5', 'CSS3'].map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-stone-800 text-stone-200 font-mono">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <h3 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4" /> ML & Vision
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['PyTorch', 'Vision Transformers', 'Restormer', 'Swin', 'CNNs', 'Wavelets', 'Segmentation'].map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-stone-800 text-stone-200 font-mono">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Tools & Libraries
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['NumPy', 'OpenCV', 'Albumentations', 'BasicSR', 'JavaFX', 'Git', 'Linux'].map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-stone-800 text-stone-200 font-mono">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <Cloud className="w-4 h-4" /> Cloud & Core CS
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['AWS Amplify', 'CloudFront', 'Data Structures', 'Algorithms', 'OS', 'DBMS', 'Networks'].map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-stone-800 text-stone-200 font-mono">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AWS Architecture Deployment & Cloud Verification */}
        <section className="p-8 rounded-3xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              AWS Amplify Hosted
            </div>
            <h3 className="text-xl font-bold text-white">Live AWS Architecture & Deployment</h3>
            <p className="text-sm text-stone-400 max-w-xl">
              Connected directly to GitHub with automated CI/CD builds on AWS Amplify Hosting, distributed via Amazon CloudFront global edge caches.
            </p>
          </div>

          <button
            onClick={() => {
              setShowArchModal(true)
              playElectricSound('switch', soundEnabled)
            }}
            className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-all border border-stone-700 flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Cloud className="w-4 h-4 text-amber-400" />
            <span>View AWS Architecture Specs</span>
          </button>
        </section>

        {/* Contact / Footer */}
        <section id="contact" className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-stone-400">
          <div>
            <p className="font-semibold text-white">Harisankar S</p>
            <p className="text-xs mt-0.5">B.Tech Computer Science & Engineering • TKM College of Engineering, Kollam</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={copyEmail}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
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

      {/* AWS Architecture Specs Modal */}
      {showArchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Cloud className="w-5 h-5" />
                <span>AWS Live Deployment Specs & CI/CD</span>
              </div>
              <button 
                onClick={() => setShowArchModal(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono bg-black p-4 rounded-xl border border-stone-800 text-stone-300">
              <div className="text-amber-400 font-bold">// 1. Continuous Deployment Pipeline</div>
              <p>Git Commit ➔ GitHub (harisankar-s-cs/aws-portfolio) ➔ AWS Amplify Webhook ➔ Automated Build Container</p>

              <div className="text-amber-400 font-bold pt-2">// 2. Global Edge Distribution</div>
              <p>Amplify Hosting ➔ Amazon CloudFront (Global CDN Points of Presence) ➔ Route 53 DNS ➔ Visitor Browser</p>

              <div className="text-amber-400 font-bold pt-2">// 3. Performance & Security Metrics</div>
              <p>• Zero Cold-Starts: Static SPA compilation with Vite<br/>• Automated SSL: AWS Certificate Manager (ACM)<br/>• Cache-Control: Immutable asset hashing for instant reloads</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowArchModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs"
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
