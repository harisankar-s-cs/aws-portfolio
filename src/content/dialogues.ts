// src/content/dialogues.ts
export interface DialogueTriggerMap {
  contactHover: string
  resumeDownload: string
  restrictedItem: string
  skillsHeading: string
  notFound: string
  portraitHoverLines: string[]
}

export const dialogues: DialogueTriggerMap = {
  // Movie-dialogue microcopy (short one-liners, displayed as subtle 2.2s toasts)
  contactHover: "I'm gonna make him an offer he can't refuse.",
  resumeDownload: "I'll be back.",
  restrictedItem: "You shall not pass!",
  skillsHeading: "With great power comes great responsibility.",
  notFound: "Houston, we have a problem.",
  
  // Portrait hover cycle (after 600ms hover, 8s cooldown)
  portraitHoverLines: [
    "Looks sharp, right?",
    "Yes, that's really me.",
    "Okay, okay, back to the work.",
    "NVIDIA H200s didn't melt this hair."
  ]
}
