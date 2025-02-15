import { useState } from 'react'
import { router } from 'expo-router'
import { useFetch } from '@/hooks/api/useFetch'
import { Environment } from '@/constants/Environment'

interface RequestOTPResponse {
  message: string
  email: string
}

export function useForgotPasswordFlow() {
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

    try {
      const response = await requestOTP({ 
        email, 
        type: 'reset-password',
      })
      
      if (response?.email) {
        router.push({
          pathname: '/otp',
          params: { 
            email: response.email,
            type: 'reset-password',
          },
        })
      }
    } catch (error) {
      console.error('Failed to request password reset:', error)
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
    handleResetPassword,
    isValidEmail,
  }
} 