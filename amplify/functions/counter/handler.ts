// amplify/functions/counter/handler.ts
let inMemoryCounter = 1420

export const handler = async (event: any): Promise<{
  statusCode: number
  headers: Record<string, string>
  body: string
}> => {
  inMemoryCounter++

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify({
      count: inMemoryCounter,
      table: 'Amplify-VisitorCounter-DynamoDB',
      updatedAt: new Date().toISOString(),
    }),
  }
}
