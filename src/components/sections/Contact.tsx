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
    <section id="contact" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* Section Header */}
      <div 
        onMouseEnter={handleMouseEnterContact}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-6"
      >
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-amber-lamp">
            // INITIATE DIALOGUE
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-bone tracking-tight font-normal mt-2">
            Direct Transmission.
          </h2>
        </div>
        <p className="font-mono text-xs text-muted max-w-xs sm:text-right">
          Open to research collaborations, cloud engineering roles, and deep learning fellowships.
        </p>
      </div>

      {/* Huge Click-to-Copy Email Anchor */}
      <div className="space-y-4">
        <span className="font-mono text-xs text-muted uppercase tracking-wider block">
          Primary Channel (Click to Copy)
        </span>
        
        <button
          onClick={handleCopyEmail}
          className="text-left font-display text-3xl sm:text-5xl lg:text-7xl text-bone hover:text-amber-lamp transition-colors duration-300 font-normal tracking-tight break-all cursor-pointer group"
          data-cursor="COPY"
        >
          {personal.email}
          <span className="inline-block ml-3 font-mono text-xs text-amber-lamp group-hover:translate-x-2 transition-transform duration-300">
            {copied ? '✓ COPIED TO CLIPBOARD' : '↗'}
          </span>
        </button>
      </div>

      {/* Contact Form & Socials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 hairline-t">
        
        {/* Left: Contact Form (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          <h3 className="font-display text-2xl text-bone font-normal">
            Transmit a Message
          </h3>

          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full bg-[#12100E] border border-hairlineLight rounded-lg px-4 py-3 font-mono text-xs text-bone placeholder:text-muted focus:outline-none focus:border-amber-lamp transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                className="w-full bg-[#12100E] border border-hairlineLight rounded-lg px-4 py-3 font-mono text-xs text-bone placeholder:text-muted focus:outline-none focus:border-amber-lamp transition-colors"
              />
            </div>

            <textarea
              required
              rows={4}
              placeholder="Your Transmission / Inquiry"
              className="w-full bg-[#12100E] border border-hairlineLight rounded-lg px-4 py-3 font-mono text-xs text-bone placeholder:text-muted focus:outline-none focus:border-amber-lamp transition-colors resize-none"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-amber-lamp text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-lamp/20"
            >
              {formSubmitted ? '✓ Message Transmitted' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Right: Direct Coordinates & Socials (5 cols) */}
        <div className="md:col-span-5 space-y-6 font-mono text-xs text-muted">
          <h3 className="font-display text-2xl text-bone font-normal font-sans">
            Direct Coordinates
          </h3>

          <div className="space-y-4 divide-y divide-hairline">
            <div className="pt-3 flex justify-between">
              <span>Location</span>
              <span className="text-bone">{personal.location}</span>
            </div>
            <div className="pt-3 flex justify-between">
              <span>Telephone</span>
              <span className="text-bone">{personal.phone}</span>
            </div>
            <div className="pt-3 flex justify-between">
              <span>GitHub</span>
              <a 
                href={personal.github} 
                target="_blank" 
                rel="noreferrer"
                className="text-bone hover:text-amber-lamp transition-colors"
              >
                github.com/harisankar-s-cs ↗
              </a>
            </div>
            <div className="pt-3 flex justify-between">
              <span>LinkedIn</span>
              <a 
                href={personal.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="text-bone hover:text-amber-lamp transition-colors"
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
