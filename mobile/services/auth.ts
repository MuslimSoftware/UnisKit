import { Environment } from '@/constants/Environment'

interface RequestOTPResponse {
  message: string
  email: string
}

interface VerifyOTPResponse {
  access_token: string
  token_type: string
}

export const authService = {
  requestOTP: (email: string) => ({
    url: `${Environment.apiUrl}/auth/request-otp`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    },
  }),

  verifyOTP: (params: { email: string; otp: string }) => ({
    url: `${Environment.apiUrl}/auth/verify-otp`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  }),
} 