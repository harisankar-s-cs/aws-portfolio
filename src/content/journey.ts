// src/content/journey.ts
export interface JourneyItem {
  year: string
  period: string
  title: string
  organization: string
  location: string
  type: "education" | "experience" | "leadership" | "accolade"
  summary: string
  highlights?: string[]
}

export const journey: JourneyItem[] = [
  {
    year: "2026",
    period: "Jun 2026 – Present",
    title: "Chairperson, ACM Student Chapter",
    organization: "TKM College of Engineering",
    location: "Kollam, Kerala",
    type: "leadership",
    summary: "Elected to lead the executive committee, directing the vision, technical hackathons, research reading groups, and developer workshops for 500+ undergraduate student members."
  },
  {
    year: "2026",
    period: "May 2026 – Jul 2026",
    title: "Deep Learning Research Intern",
    organization: "National Institute of Technology Calicut (NIT Calicut)",
    location: "Calicut, Kerala",
    type: "experience",
    summary: "Conducted medical vision research in the Dept. of CSE. Developed the Wavelet Dual-Stream Hybrid Restormer on NVIDIA H200 GPUs, achieving 37.39 dB PSNR on ultrasound datasets."
  },
  {
    year: "2025",
    period: "Jun 2025 – Jul 2025",
    title: "Computer Vision / Deep Learning Intern",
    organization: "Kerala State Remote Sensing and Environment Centre (KSREC)",
    location: "Thiruvananthapuram, Kerala",
    type: "experience",
    summary: "Built Siamese Swin Transformer architectures for pixel-level land-use change detection on the LEVIR-CD benchmark with 96.9% accuracy to automate state GIS environmental monitoring."
  },
  {
    year: "2023",
    period: "2023 – 2027 (Expected)",
    title: "B.Tech in Computer Science & Engineering",
    organization: "TKM College of Engineering (TKMCE)",
    location: "Kollam, Kerala",
    type: "education",
    summary: "Maintaining a cumulative CGPA of 8.90 / 10. Core coursework: Data Structures, Operating Systems, Computer Networks, Database Management Systems, and Theory of Computation."
  },
  {
    year: "2023",
    period: "2023",
    title: "Higher Secondary (Class XII) – Science",
    organization: "Christ Nagar Central School",
    location: "Thiruvananthapuram, Kerala",
    type: "education",
    summary: "Graduated with 94% in Science stream with Mathematics and Computer Science."
  },
  {
    year: "2021",
    period: "2021",
    title: "Secondary School (Class X)",
    organization: "St. Thomas Residential School",
    location: "Thiruvananthapuram, Kerala",
    type: "education",
    summary: "Graduated with 96% academic distinction."
  },
  {
    year: "Foundations",
    period: "National Level",
    title: "National 2nd Runner-Up (Mental Arithmetic)",
    organization: "National Abacus Championship",
    location: "India",
    type: "accolade",
    summary: "Secured National 2nd Runner-Up and Kerala State 1st Runner-Up in high-speed mental arithmetic, establishing deep foundational numerical and spatial visualization discipline."
  }
]
