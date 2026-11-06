// amplify/functions/contact/resource.ts
export const contactFunctionConfig = {
  name: 'contactDispatcher',
  entry: './handler.ts',
  runtime: 'nodejs20.x',
  timeoutSeconds: 10,
  memoryMB: 128,
}
