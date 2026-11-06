// src/components/sections/Contact.tsx
import React, { useState } from 'react'
import { personal } from '../../content/personal'
import { dialogues } from '../../content/dialogues'

interface ContactProps {
  onTriggerDialogue: (key: string, quote: string) => void
}

export function Contact({ onTriggerDialogue }: ContactProps) {
  const [copied, setCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handleMouseEnterContact = () => {
    onTriggerDialogue('contactHover', dialogues.contactHover)
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="py-32 sm:py-44 px-6 sm:px-12 max-w-7xl mx-auto space-y-20">
      
      {/* Section Header */}
      <div 
        onMouseEnter={handleMouseEnterContact}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 hairline-b pb-8"
      >
        <div className="space-y-4">
          <span className="font-mono text-base uppercase tracking-widest text-amber-lamp font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-lamp" />
            <span>// INITIATE DIALOGUE & TRANSMISSION</span>
          </span>
          <h2 className="font-display text-6xl sm:text-8xl text-bone tracking-tight font-normal">
            Direct Transmission.
          </h2>
        </div>
        <p className="font-mono text-sm sm:text-base text-muted max-w-sm sm:text-right leading-relaxed">
          Open to research collaborations, cloud engineering roles, and deep learning fellowships.
        </p>
      </div>

      {/* Huge Click-to-Copy Email Anchor */}
      <div className="space-y-4">
        <span className="font-mono text-sm text-muted uppercase tracking-wider block font-bold">
          Primary Secure Channel (Click to Copy)
        </span>
        
        <button
          onClick={handleCopyEmail}
          className="text-left font-display text-4xl sm:text-6xl lg:text-8xl text-bone hover:text-amber-lamp transition-colors duration-300 font-normal tracking-tight break-all cursor-pointer group"
          data-cursor="COPY"
        >
          {personal.email}
          <span className="inline-block ml-4 font-mono text-sm text-amber-lamp group-hover:translate-x-3 transition-transform duration-300">
            {copied ? '✓ COPIED TO CLIPBOARD' : '↗'}
          </span>
        </button>
      </div>

      {/* Contact Form & Socials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pt-10 hairline-t">
        
        {/* Left: Contact Form (7 cols) */}
        <div className="md:col-span-7 space-y-8">
          <h3 className="font-display text-3xl sm:text-4xl text-bone font-normal">
            Transmit a Message
          </h3>

          <form onSubmit={handleSubmitForm} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full bg-[#12100E] border border-hairlineLight rounded-xl px-5 py-4 font-mono text-sm sm:text-base text-bone placeholder:text-muted focus:outline-none focus:border-amber-lamp transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                className="w-full bg-[#12100E] border border-hairlineLight rounded-xl px-5 py-4 font-mono text-sm sm:text-base text-bone placeholder:text-muted focus:outline-none focus:border-amber-lamp transition-colors"
              />
            </div>

            <textarea
              required
              rows={4}
              placeholder="Your Transmission / Inquiry"
              className="w-full bg-[#12100E] border border-hairlineLight rounded-xl px-5 py-4 font-mono text-sm sm:text-base text-bone placeholder:text-muted focus:outline-none focus:border-amber-lamp transition-colors resize-none"
            />

            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-amber-lamp text-background font-mono text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-lamp/20"
            >
              {formSubmitted ? '✓ Message Transmitted via SNS' : 'Send Message ↗'}
            </button>
          </form>
        </div>

        {/* Right: Direct Coordinates & Socials (5 cols) */}
        <div className="md:col-span-5 space-y-8 font-mono text-sm sm:text-base text-muted">
          <h3 className="font-display text-3xl sm:text-4xl text-bone font-normal font-sans">
            Direct Coordinates
          </h3>

          <div className="space-y-5 divide-y divide-hairline">
            <div className="pt-4 flex justify-between items-center">
              <span>Location</span>
              <span className="text-bone font-medium">{personal.location}</span>
            </div>
            <div className="pt-4 flex justify-between items-center">
              <span>Telephone</span>
              <span className="text-bone font-medium">{personal.phone}</span>
            </div>
            <div className="pt-4 flex justify-between items-center">
              <span>GitHub</span>
              <a 
                href={personal.github} 
                target="_blank" 
                rel="noreferrer"
                className="text-bone hover:text-amber-lamp transition-colors underline font-medium"
              >
                github.com/harisankar-s-cs ↗
              </a>
            </div>
            <div className="pt-4 flex justify-between items-center">
              <span>LinkedIn</span>
              <a 
                href={personal.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="text-bone hover:text-amber-lamp transition-colors underline font-medium"
              >
                in/harisankar-s-0741b22a4 ↗
              </a>
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}
