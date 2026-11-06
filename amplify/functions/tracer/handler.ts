// amplify/functions/tracer/handler.ts
export interface TraceResponse {
  region: string
  durationMs: number
  requestId: string
  timestamp: string
  engine: string
}

export const handler = async (event: any): Promise<{
  statusCode: number
  headers: Record<string, string>
  body: string
}> => {
  const startTime = Date.now()
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'ap-south-1'
  const requestId = event?.requestContext?.requestId || `req_${Math.random().toString(36).substring(2, 10)}`
  
  // Micro-execution simulation if local, or real execution latency
  const durationMs = Math.max(12, Date.now() - startTime + 8)

  const payload: TraceResponse = {
    region,
    durationMs,
    requestId,
    timestamp: new Date().toISOString(),
    engine: 'AWS Lambda (Node.js 20.x)',
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
    body: JSON.stringify(payload),
  }
}
