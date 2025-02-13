export const Environment = {
  isDev: __DEV__,
  devMode: {
    bypassAuth: true, // Bypass email verification, OTP, etc.
    autoFillCredentials: {
      enabled: true,
      email: 'test@example.com',
      password: 'password123',
    },
  },
} as const 