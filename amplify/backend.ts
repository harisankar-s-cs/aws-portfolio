// amplify/backend.ts
import { authConfig } from './auth/resource'
import { tracerFunctionConfig } from './functions/tracer/resource'
import { counterFunctionConfig } from './functions/counter/resource'
import { contactFunctionConfig } from './functions/contact/resource'

/**
 * AWS Amplify Gen 2 Root Backend Definition
 * Configures CloudFront, S3 hosting, Lambda functions, and DynamoDB.
 */
export const backend = {
  auth: authConfig,
  functions: {
    tracer: tracerFunctionConfig,
    counter: counterFunctionConfig,
    contact: contactFunctionConfig,
  },
  hosting: {
    spa: true,
    cacheHeaders: true,
  },
}

export default backend
