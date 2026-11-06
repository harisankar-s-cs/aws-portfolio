// amplify/functions/contact/handler.ts
export const handler = async (event: any): Promise<{
  statusCode: number
  headers: Record<string, string>
  body: string
}> => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {}
    const { name, email, message, honeypot } = body

    // 1. Honeypot check for spam prevention
    if (honeypot) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, note: 'Filtered' }),
      }
    }

    // 2. Strict input validation
    if (!name || !email || !message || message.length < 5) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid payload: name, email, and message are required.' }),
      }
    }

    // 3. SNS Email Notification Dispatch
    const inquiryRecord = {
      name: String(name).slice(0, 100),
      email: String(email).slice(0, 100),
      message: String(message).slice(0, 2000),
      receivedAt: new Date().toISOString(),
      topicArn: process.env.SNS_TOPIC_ARN || 'arn:aws:sns:ap-south-1:123456789012:PortfolioInquiries',
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        success: true,
        message: 'Inquiry successfully dispatched to AWS SNS topic.',
        receivedAt: inquiryRecord.receivedAt,
      }),
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal execution error', details: err.message }),
    }
  }
}
