// amplify/auth/resource.ts
/**
 * Defines guest/unauthenticated access for public portfolio telemetry
 * and IAM authorization rules for AWS Amplify Gen 2.
 */
export const authConfig = {
  allowUnauthenticatedIdentities: true,
  loginMechanisms: ['email'] as const,
}
