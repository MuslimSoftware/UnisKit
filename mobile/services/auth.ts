import { Environment } from '@/constants/Environment'
import { Platform } from 'react-native'

interface RequestOTPResponse {
  message: string
  email: string
}

interface VerifyOTPResponse {
  access_token: string
  token_type: string
}

export const authService = {
  requestOTP: async (email: string): Promise<RequestOTPResponse> => {
    const url = `${Environment.apiUrl}/auth/request-otp`
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const text = await response.text()

      if (!response.ok) {
        throw new Error(text || 'Failed to send OTP')
      }

      return JSON.parse(text)
    } catch (error) {
      console.error(`[${Platform.OS}] Request failed:`, error)
      throw error
    }
  },

  verifyOTP: async (email: string, otp: string): Promise<VerifyOTPResponse> => {
    const url = `${Environment.apiUrl}/auth/verify-otp`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      })

      const text = await response.text()

      if (!response.ok) {
        throw new Error(text || 'Failed to verify OTP')
      }

      return JSON.parse(text)
    } catch (error) {
      console.error(`[${Platform.OS}] Request failed:`, error)
      throw error
    }
  },
} 