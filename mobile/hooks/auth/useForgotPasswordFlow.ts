import { useState } from 'react'
import { router } from 'expo-router'
import { useFetch } from '@/hooks/api/useFetch'
import { Environment } from '@/constants/Environment'

interface VerifyEmailResponse {
  exists: boolean
  message: string
}

export function useForgotPasswordFlow() {
  const [email, setEmail] = useState(
    Environment.devMode.autoFillCredentials?.email || ''
  )
  const [error, setError] = useState<Error | null>(null)

  const {
    fetch: verifyEmail,
    loading,
    error: verifyError,
  } = useFetch<VerifyEmailResponse>(() => ({
    url: `${Environment.apiUrl}/auth/verify-email`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    },
  }))

  const handleResetPassword = async () => {
    if (Environment.devMode.bypassAuth) {
      router.push({
        pathname: '/otp',
        params: { 
          email,
          type: 'reset-password',
        },
      })
      return
    }

    // Validate email format
    if (!isValidEmail(email)) {
      setError(new Error('Please enter a valid email address'))
      return
    }

    try {
      const response = await verifyEmail()
      if (!response) {
        throw new Error('Failed to verify email')
      }

      if (!response.exists) {
        throw new Error(response.message)
      }

      // Email exists, proceed to OTP page
      router.push({
        pathname: '/otp',
        params: { 
          email,
          type: 'reset-password',
        },
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to verify email'))
    }
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return {
    email,
    setEmail,
    loading,
    error: verifyError || error,
    handleResetPassword,
    isValidEmail,
  }
} 