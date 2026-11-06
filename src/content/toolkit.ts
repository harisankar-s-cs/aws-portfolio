// src/content/toolkit.ts
export interface ToolItem {
  name: string
  detail: string
}

export interface ToolGroup {
  groupName: string
  groupDescription: string
  items: ToolItem[]
}

export const toolkit: ToolGroup[] = [
  {
    groupName: "Cloud & Infrastructure (AWS)",
    groupDescription: "Production deployment, automated pipelines, and global delivery.",
    items: [
      {
        name: "AWS Amplify Hosting",
        detail: "Configured zero-config CI/CD pipelines deploying static SPA builds directly from GitHub."
      },
      {
        name: "Amazon CloudFront",
        detail: "Distributed web assets globally across 600+ edge PoPs with immutable caching and sub-35ms delivery."
      },
      {
        name: "Amazon S3",
        detail: "Organized object storage for dataset archives, satellite imagery rasters, and web artifacts."
      },
      {
        name: "AWS Lambda (Serverless)",
        detail: "Architected event-driven micro-functions for asynchronous payload processing and telemetry triggers."
      },
      {
        name: "Route 53 & ACM",
        detail: "Managed global DNS routing, domain latency policies, and automated TLS/SSL certificate lifecycle."
      }
    ]
  },
  {
    groupName: "Deep Learning & Computer Vision",
    groupDescription: "Neural architectures, loss formulations, and multi-GPU distributed training.",
    items: [
      {
        name: "PyTorch",
        detail: "Implemented custom loss formulations (Edge-Aware L1), DDP training curricula, and multi-GPU pipelines."
      },
      {
        name: "Vision Transformers (Restormer, Swin)",
        detail: "Engineered 26M-parameter Restormer hybrid backbones and SwinV2 hierarchical feature decoders."
      },
      {
        name: "Wavelet Transforms",
        detail: "Separated high-frequency tissue boundary coefficients from low-frequency speckle noise planes."
      },
      {
        name: "OpenCV & Albumentations",
        detail: "Automated affine spatial augmentations, elastic deformation, and multi-spectral satellite normalization."
      },
      {
        name: "Convolutional Neural Networks (CNN)",
        detail: "Designed custom EdgeCNN residual blocks integrated directly into dual-stream vision transformers."
      }
    ]
  },
  {
    groupName: "Languages & Computer Science Core",
    groupDescription: "Foundational software engineering, algorithmic efficiency, and typed design.",
    items: [
      {
        name: "Python",
        detail: "Primary language for PyTorch model development, data wrangling (NumPy), and scientific prototyping."
      },
      {
        name: "TypeScript / JavaScript",
        detail: "Crafting typed, resilient web applications with modern reactive frameworks (React, Vite)."
      },
      {
        name: "Java",
        detail: "Architected concurrent desktop software with thread-safe dispatch state machines and JavaFX."
      },
      {
        name: "C",
        detail: "Low-level systems programming, manual memory management, and pointer arithmetic foundations."
      },
      {
        name: "Data Structures & Algorithms",
        detail: "Strong foundations in asymptotic complexity, graph traversal, and dynamic programming."
      }
    ]
  }
]
