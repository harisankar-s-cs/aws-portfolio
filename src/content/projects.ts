// src/content/projects.ts
export interface Project {
  slug: string
  number: string
  title: string
  category: string
  role: string
  organization: string
  timeline: string
  summary: string
  deliverables: string[]
  metrics: { label: string; value: string }[]
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  awsArchitectureNote?: string
}

export const projects: Project[] = [
  {
    slug: "wavelet-restormer-ultrasound",
    number: "01",
    title: "Wavelet Dual-Stream Hybrid Restormer",
    category: "Medical Deep Learning & Image Denoising",
    role: "Deep Learning Research Intern",
    organization: "National Institute of Technology Calicut (NIT Calicut)",
    timeline: "May 2026 – Jul 2026",
    summary: "Engineered a 26M-parameter Vision Transformer combined with a custom EdgeCNN to eliminate musculoskeletal ultrasound speckle noise while preserving diagnostic tissue boundaries. Trained with a progressive patch-size curriculum (128px → 384px) on NVIDIA H200 GPUs.",
    deliverables: [
      "Designed a custom Edge-Aware L1 loss function to penalize high-frequency boundary loss over generic smoothing.",
      "Achieved 37.39 dB PSNR and 0.953 SSIM on clinical datasets with 95.5% speckle dissipation.",
      "Optimized PyTorch distributed data parallel (DDP) pipelines to reduce multi-GPU training time by 34%."
    ],
    metrics: [
      { label: "Fidelity PSNR", value: "37.39 dB" },
      { label: "Structural SSIM", value: "0.953" },
      { label: "Parameters", value: "26M" },
      { label: "Training Speedup", value: "+34%" }
    ],
    technologies: ["PyTorch", "Vision Transformers", "Restormer", "EdgeCNN", "Wavelet Transform", "NVIDIA H200", "Albumentations"],
    githubUrl: "https://github.com/harisankar-s-cs",
    awsArchitectureNote: "Target AWS Pipeline: Amazon EC2 P5 GPU instances for distributed fine-tuning, S3 Intelligent-Tiering for dicom datasets, SageMaker Async Endpoint for hospital inference."
  },
  {
    slug: "geospatial-land-use-swin",
    number: "02",
    title: "Siamese Swin Transformer for Satellite Change Detection",
    category: "Geospatial Computer Vision & Remote Sensing",
    role: "Computer Vision Intern",
    organization: "Kerala State Remote Sensing and Environment Centre (KSREC)",
    timeline: "Jun 2025 – Jul 2025",
    summary: "Built a Siamese Swin Transformer (SwinV2-Tiny backbone) with differential feature fusion and a convolutional decoder to detect pixel-level urban expansion and deforestation across Kerala from bi-temporal satellite imagery.",
    deliverables: [
      "Implemented an end-to-end training pipeline on the LEVIR-CD benchmark (637 bi-temporal image pairs at 0.5m ground resolution).",
      "Achieved 96.9% pixel-level accuracy and an F1-score of 0.695, suppressing false positives caused by seasonal vegetation shifts.",
      "Proposed an automated integration workflow for KSREC GIS systems to accelerate infrastructure and wetland monitoring."
    ],
    metrics: [
      { label: "Pixel Accuracy", value: "96.9%" },
      { label: "F1-Score", value: "0.695" },
      { label: "LEVIR-CD Resolution", value: "0.5m" },
      { label: "Backbone", value: "SwinV2-Tiny" }
    ],
    technologies: ["Python", "PyTorch", "Swin Transformer", "OpenCV", "LEVIR-CD", "QGIS", "NumPy"],
    githubUrl: "https://github.com/harisankar-s-cs",
    awsArchitectureNote: "Target AWS Pipeline: AWS Ground Station / S3 satellite bucket triggers AWS Lambda to preprocess GeoTIFFs, routed to SageMaker Geospatial ML endpoint."
  },
  {
    slug: "hop-on-cab-booking-system",
    number: "03",
    title: "Hop On — Concurrent Cab Booking System",
    category: "Full-Stack Software Architecture",
    role: "Lead Software Architect",
    organization: "TKM College of Engineering Coursework",
    timeline: "2024",
    summary: "Architected a multi-module desktop cab booking platform in Java with separate concurrent workflows for riders and drivers. Designed thread-safe dispatch algorithms, user authentication, and a responsive JavaFX graphical interface.",
    deliverables: [
      "Engineered atomic state transitions for ride requests, locking available drivers to prevent race-condition double bookings.",
      "Implemented custom fare computation engines factoring distance, estimated transit time, and peak vehicle availability.",
      "Constructed modular MVC architecture with decoupled data storage interfaces."
    ],
    metrics: [
      { label: "Architecture", value: "Decoupled MVC" },
      { label: "Concurrency", value: "Thread-Safe" },
      { label: "UI Layer", value: "JavaFX" }
    ],
    technologies: ["Java", "JavaFX", "OOP Design Patterns", "Concurrency", "State Machines"],
    githubUrl: "https://github.com/harisankar-s-cs",
    awsArchitectureNote: "Target AWS Pipeline: Containerized microservices on AWS ECS Fargate, DynamoDB for active ride transactions, and Amazon Cognito for rider/driver auth."
  }
]
