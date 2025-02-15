import { useState } from 'react'
import { router } from 'expo-router'
import { useFetch } from '@/hooks/api/useFetch'
import { Environment } from '@/constants/Environment'

interface RequestOTPResponse {
  message: string
  email: string
}

export function useEmailSignup() {
  const [email, setEmail] = useState(
    Environment.devMode.autoFillCredentials?.email || ''
  )

  const {
    fetch: requestOTP,
    loading,
    error,
  } = useFetch<RequestOTPResponse>((params) => ({
    url: `${Environment.apiUrl}/auth/request-otp`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  }))

  const handleContinue = async () => {
    if (Environment.devMode.bypassAuth) {
      router.push({
        pathname: '/otp',
        params: { email },
      })
      return
    }

    try {
      const response = await requestOTP({ email, type: 'signup' })
      if (response?.email) {
        router.push({
          pathname: '/otp',
          params: { 
            email: response.email,
            type: 'signup',
          },
        })
      }
    } catch (error) {
      console.error('Failed to send OTP:', error)
    }
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return {
    email,
    setEmail,
    loading,
    error,
    handleContinue,
    isValidEmail,
  }
} 