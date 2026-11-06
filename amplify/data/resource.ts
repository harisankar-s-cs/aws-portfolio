// amplify/data/resource.ts
/**
 * DynamoDB Schema definition for Amplify Gen 2.
 * Models:
 * - VisitorCounter: Atomic page-hit increment
 * - Inquiries: Direct transmissions from contact form
 * - TelemetryLogs: Request tracing timestamps & edge points
 */

export interface VisitorCounterModel {
  id: string
  totalHits: number
  lastUpdated: string
}

export interface InquiryModel {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
  sourceIp?: string
}

export interface TelemetryModel {
  id: string
  region: string
  executionDurationMs: number
  clientIp?: string
  timestamp: string
}
