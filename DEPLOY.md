# AWS Amplify Deployment Guide

This portfolio is architected as a high-performance static SPA optimized for continuous deployment on **AWS Amplify Hosting**.

---

## 1. Prerequisites
*   A **GitHub Account** with this repository pushed to your account.
*   An **AWS Account** (Free Tier eligible).

---

## 2. Deploy in 4 Clicks via AWS Amplify Console

1.  **Open AWS Amplify Console:**
    *   Navigate to [https://console.aws.amazon.com/amplify/](https://console.aws.amazon.com/amplify/).
    *   Make sure your region is set to your preferred region (e.g., `us-east-1` or `ap-south-1`).

2.  **Create New App:**
    *   Click the **Create new app** button.
    *   Select **GitHub** as the Git repository provider and click **Next**.
    *   Authorize AWS Amplify to access your GitHub account if prompted.

3.  **Select Repository & Branch:**
    *   Choose repository: `aws-portfolio` (or your chosen repository name).
    *   Select branch: `main`.
    *   Click **Next**.

4.  **Confirm Build Settings:**
    *   Amplify will automatically detect the [`amplify.yml`](./amplify.yml) file located in the root of the project.
    *   Output directory: `dist`.
    *   Build command: `npm run build`.
    *   Click **Next** and then click **Save and deploy**.

---

## 3. What Happens Under the Hood
1.  **Continuous Integration (CI):** Amplify spins up a managed Amazon Linux build container, runs `npm ci`, and executes `vite build`.
2.  **Edge CDN Distribution:** Output files in `dist/` are automatically synchronized and broadcast to **Amazon CloudFront** edge Points of Presence worldwide.
3.  **Global HTTPS & SSL:** An automated SSL certificate is provisioned via **AWS Certificate Manager (ACM)**.
4.  **SPA Rewrites & Caching:** The custom rewrites in `amplify.yml` route all client-side navigation (`/work/:slug`) to `/index.html` with immutable caching on WebP frames, fonts, and hashed chunks.

---

## 4. Submitting to the Hackathon
Once deployed:
1. Copy your live AWS Amplify URL (e.g., `https://main.d123456789.amplifyapp.com`).
2. Provide your public GitHub repository link.
3. Submit your project write-up detailing the R3F shader, canvas sequence, and AWS Amplify architecture!
