// src/content/story.ts
export interface StoryChapter {
  id: string
  number: string
  title: string
  subtitle: string
  body: string
  metricLabel?: string
  metricValue?: string
}

export const storyChapters: StoryChapter[] = [
  {
    id: "chapter-1",
    number: "01",
    title: "Who I Am",
    subtitle: "Mathematical Rigor & First Principles",
    body: "Long before training neural networks, competitive mental arithmetic trained my intuition for multi-dimensional operations and numerical boundaries. At TKM College of Engineering, I turned that discipline toward computational theory and visual intelligence.",
    metricLabel: "National & State Laureate",
    metricValue: "Mental Arithmetic"
  },
  {
    id: "chapter-2",
    number: "02",
    title: "What I Build",
    subtitle: "High-Throughput Vision Transformers",
    body: "At NIT Calicut, I engineered a 26M-parameter hybrid Restormer to eliminate ultrasound speckle noise while preserving diagnostic tissue edges on NVIDIA H200 GPU clusters. At KSREC, I developed Siamese Swin Transformers to track pixel-level land reclamation from satellite imagery.",
    metricLabel: "Ultrasound Benchmark",
    metricValue: "37.39 dB PSNR"
  },
  {
    id: "chapter-3",
    number: "03",
    title: "Why Cloud",
    subtitle: "From Local Checkpoints to Global Edge",
    body: "Research algorithms only create value when they reach clinicians and urban planners reliably. Cloud infrastructure turns experimental PyTorch weights into secure, low-latency APIs deployed globally across resilient edge networks.",
    metricLabel: "Delivery Target",
    metricValue: "AWS Amplify & CloudFront"
  }
]
