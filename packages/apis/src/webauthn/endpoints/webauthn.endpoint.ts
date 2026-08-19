const endpoint = {
  webauthn: {
    registerOptions: '/auth/webauthn/register/options',
    registerVerify: '/auth/webauthn/register/verify',
    authenticateOptions: '/auth/webauthn/authenticate/options',
    authenticateVerify: '/auth/webauthn/authenticate/verify',
    credentials: '/auth/webauthn/credentials',
  },
} as const

export { endpoint }
