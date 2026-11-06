// amplify/functions/counter/resource.ts
export const counterFunctionConfig = {
  name: 'visitorCounter',
  entry: './handler.ts',
  runtime: 'nodejs20.x',
  timeoutSeconds: 5,
  memoryMB: 128,
}
