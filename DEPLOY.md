# AWS Amplify Gen 2 Deployment & Zero-Cost Guardrails Guide

This portfolio is built for continuous global deployment on **AWS Amplify Hosting (Gen 2)** with serverless backend capabilities (AWS Lambda, Amazon CloudFront, Amazon S3, and Amazon DynamoDB).

---

## 1. Prerequisites
*   A **GitHub Account** with this repository pushed to your account.
*   An **AWS Account** (Free Tier eligible).

---

## 2. Deploy in 4 Clicks via AWS Amplify Console

1.  **Open AWS Amplify Console:**
    *   Navigate to [https://console.aws.amazon.com/amplify/](https://console.aws.amazon.com/amplify/).
    *   Ensure your preferred region is selected (e.g., `ap-south-1` or `us-east-1`).

2.  **Create New App:**
    *   Click **Create new app**.
    *   Select **GitHub** as your Git repository provider and click **Next**.
    *   Authorize AWS Amplify to access your GitHub repository.

3.  **Select Repository & Branch:**
    *   Choose repository: `aws-portfolio` (or your chosen name).
    *   Branch: `main`.
    *   Click **Next**.

4.  **Confirm Build Settings:**
    *   Amplify will automatically detect the [`amplify.yml`](./amplify.yml) file in the root directory.
    *   Backend deployment: `npx ampx pipeline-deploy`.
    *   Frontend build: `npm run build` with output directory `dist`.
    *   Click **Save and deploy**.

Your application will build in ~2 minutes and deploy globally across CloudFront edge locations with automated SSL/TLS certificates via AWS Certificate Manager (ACM).

---

## 3. Local Development Sandbox (Amplify Gen 2)

To test the live Lambda functions and DynamoDB tables locally:
```bash
npx ampx sandbox
```
This provisions ephemeral cloud resources for your local development session and outputs live endpoint URLs.

---

## 4. Zero-Cost Guardrail: AWS Budgets Alert Setup

To ensure you stay 100% within the AWS Free Tier, configure an automated budget alert:

1. Open the [AWS Billing & Cost Management Console](https://console.aws.amazon.com/billing/).
2. In the left navigation, click **Budgets** $\rightarrow$ click **Create budget**.
3. Select **Zero spend budget** (or choose **Cost budget** and enter `$1.00 USD`).
4. Set the budget name: `Zero-Spend-Portfolio-Alert`.
5. Enter your email address to receive immediate alerts if any service exceeds $0.01.
6. Click **Create budget**.

---

## 5. Security & Cost Guardrails Verified
* **Least-Privilege IAM:** Lambda functions run with minimum necessary execution roles.
* **No Frontend Secrets:** All API keys and environment variables are serverless-isolated.
* **CORS & Throttling:** Strict origins and payload limits on contact endpoints.
* **Year-Long Immutable Caching:** WebP depth maps, self-hosted fonts, and hashed chunks are cached at the edge, drastically reducing origin hits to S3.
