// amplify/functions/tracer/resource.ts
export const tracerFunctionConfig = {
  name: 'tracer',
  entry: './handler.ts',
  runtime: 'nodejs20.x',
  timeoutSeconds: 5,
  memoryMB: 128, // Free tier friendly
}
