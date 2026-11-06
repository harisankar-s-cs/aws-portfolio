// src/content/personal.ts
export interface PersonalInfo {
  name: string
  legalName: string
  role: string
  location: string
  institution: string
  degree: string
  cgpa: string
  period: string
  email: string
  phone: string
  github: string
  linkedin: string
  leadership: string
  accolade: string
  shortBio: string
}

export const personal: PersonalInfo = {
  name: "Harisankar S",
  legalName: "Harisankar S",
  role: "Deep Learning Researcher & Computer Science Undergraduate",
  location: "Thiruvananthapuram, Kerala, India",
  institution: "TKM College of Engineering, Kollam",
  degree: "B.Tech in Computer Science & Engineering",
  cgpa: "8.90 / 10",
  period: "2023 – 2027",
  email: "harisankar.s.cs@gmail.com",
  phone: "+91 8078916722",
  github: "https://github.com/harisankar-s-cs",
  linkedin: "https://linkedin.com/in/harisankar-s-0741b22a4",
  leadership: "Chairperson, ACM Student Chapter, TKMCE",
  accolade: "National 2nd Runner-Up & Kerala State 1st Runner-Up (Mental Arithmetic)",
  shortBio: "Specializing in Vision Transformers, medical ultrasound restoration, and geospatial satellite vision. Exploring reproducible deep vision pipelines and scalable edge cloud deployment."
}
