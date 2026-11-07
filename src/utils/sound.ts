// src/utils/sound.ts
import { Howl } from 'howler'

let soundMuted = false

// Howler sound instance held at module level so it never unmounts or gets prematurely unloaded
let switchHowl: Howl | null = null

try {
  switchHowl = new Howl({
    src: ['/assets/switch-click.wav'],
    volume: 0.85,
    preload: true,
    html5: false,
  })
} catch (e) {
  console.warn('Howler init fallback:', e)
}

// Global AudioContext for synthesized effects (switch click, filament hum, key clicks)
let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

export function isSoundMuted(): boolean {
  return soundMuted
}

export function setSoundMuted(muted: boolean): void {
  soundMuted = muted
}

export function toggleSound(): boolean {
  soundMuted = !soundMuted
  return soundMuted
}

/**
 * Plays the signature tactile mechanical lamp switch click.
 * Combines Howler sample with a punchy Web Audio relay snap so it's 100% audible across all browsers.
 */
export function playSwitchClick(): void {
  if (soundMuted) return

  // 1. Play recorded sound sample
  try {
    if (switchHowl) {
      switchHowl.play()
    }
  } catch (err) {
    // Fall back to synthesizer below
  }

  // 2. Play synthesized mechanical toggle snap
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Heavy mechanical rotary / pull toggle click
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(650, now)
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.05)

    gain.gain.setValueAtTime(0.35, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.05)

    // Second relay contact bounce at +0.02s
    const relay = ctx.createOscillator()
    const relayGain = ctx.createGain()
    relay.type = 'sine'
    relay.frequency.setValueAtTime(950, now + 0.02)
    relay.frequency.exponentialRampToValueAtTime(220, now + 0.06)

    relayGain.gain.setValueAtTime(0.25, now + 0.02)
    relayGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

    relay.connect(relayGain)
    relayGain.connect(ctx.destination)
    relay.start(now + 0.02)
    relay.stop(now + 0.06)
  } catch (err) {
    // Ignore audio errors
  }
}

/**
 * Plays the subtle warm electrical transformer hum during lamp filament ignition.
 */
export function playFilamentHum(): void {
  if (soundMuted) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // 60Hz mains power transformer hum
    const humOsc = ctx.createOscillator()
    const humGain = ctx.createGain()
    humOsc.type = 'sine'
    humOsc.frequency.setValueAtTime(60, now)

    humGain.gain.setValueAtTime(0.001, now)
    humGain.gain.linearRampToValueAtTime(0.09, now + 0.3)
    humGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

    humOsc.connect(humGain)
    humGain.connect(ctx.destination)
    humOsc.start(now)
    humOsc.stop(now + 1.2)
  } catch (e) {}
}

/**
 * Plays subtle soft mechanical click when typing in the interactive AWS CLI terminal.
 */
export function playKeyClick(): void {
  if (soundMuted) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(750 + Math.random() * 200, now)
    gain.gain.setValueAtTime(0.04, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.03)
  } catch (e) {}
}
