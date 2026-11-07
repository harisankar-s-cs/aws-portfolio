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
    <section id="contact" className="py-20 sm:py-28 px-6 sm:px-12 max-w-7xl mx-auto space-y-14">
      
      {/* Section Header */}
      <div 
        onMouseEnter={handleMouseEnterContact}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-6"
      >
        <div className="space-y-2.5">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-amber-lamp font-bold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-lamp" />
            <span>// INITIATE DIALOGUE & TRANSMISSION</span>
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone tracking-tight font-normal">
            Direct Transmission.
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-muted max-w-xs sm:text-right leading-relaxed">
          Open to research collaborations, cloud engineering roles, and deep learning fellowships.
        </p>
      </div>

      {/* Click-to-Copy Email Anchor */}
      <div className="space-y-3">
        <span className="font-mono text-xs text-muted uppercase tracking-wider block font-bold">
          Primary Secure Channel (Click to Copy)
        </span>
        
        <button
          onClick={handleCopyEmail}
          onMouseEnter={handleMouseEnterContact}
          className="text-left font-display text-3xl sm:text-4xl lg:text-5xl text-bone hover:text-amber-lamp transition-colors duration-300 font-normal tracking-tight break-all cursor-pointer group"
          data-cursor="COPY"
        >
          {personal.email}
          <span className="inline-block ml-3 font-mono text-xs text-amber-lamp group-hover:translate-x-2 transition-transform duration-300">
            {copied ? '✓ COPIED TO CLIPBOARD' : '↗'}
          </span>
        </button>
      </div>

      {/* Contact Form & Socials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pt-8 hairline-t">
        
        {/* Left: Contact Form (7 cols) */}
        <div className="md:col-span-7 space-y-5">
          <h3 className="font-display text-2xl text-bone font-normal">
            Transmit a Message
          </h3>

          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full bg-[#12100E] border border-hairlineLight rounded-lg px-4 py-3 font-mono text-xs sm:text-sm text-bone placeholder:text-muted focus:outline-none focus:border-amber-lamp transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                className="w-full bg-[#12100E] border border-hairlineLight rounded-lg px-4 py-3 font-mono text-xs sm:text-sm text-bone placeholder:text-muted focus:outline-none focus:border-amber-lamp transition-colors"
              />
            </div>

            <textarea
              required
              rows={4}
              placeholder="Your Transmission / Inquiry"
              className="w-full bg-[#12100E] border border-hairlineLight rounded-lg px-4 py-3 font-mono text-xs sm:text-sm text-bone placeholder:text-muted focus:outline-none focus:border-amber-lamp transition-colors resize-none"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-amber-lamp text-background font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-lamp/20"
            >
              {formSubmitted ? '✓ Message Transmitted via SNS' : 'Send Message ↗'}
            </button>
          </form>
        </div>

        {/* Right: Direct Coordinates & Socials (5 cols) */}
        <div className="md:col-span-5 space-y-5 font-mono text-xs sm:text-sm text-muted">
          <h3 className="font-display text-2xl text-bone font-normal font-sans">
            Direct Coordinates
          </h3>

          <div className="space-y-3.5 divide-y divide-hairline">
            <div className="pt-3 flex justify-between items-center">
              <span>Location</span>
              <span className="text-bone font-medium">{personal.location}</span>
            </div>
            <div className="pt-3 flex justify-between items-center">
              <span>Telephone</span>
              <span className="text-bone font-medium">{personal.phone}</span>
            </div>
            <div className="pt-3 flex justify-between items-center">
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
            <div className="pt-3 flex justify-between items-center">
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
