import { useState } from 'react'
import { router } from 'expo-router'
import { useFetch } from '@/hooks/api/useFetch'
import { Environment } from '@/constants/Environment'

interface RequestOTPResponse {
  message: string
  email: string
}

export function useLoginFlow() {
  const [identifier, setIdentifier] = useState(
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

  const handleLogin = async () => {
    if (Environment.devMode.bypassAuth) {
      router.push('/otp')
      return
    }

    try {
      const response = await requestOTP({ email: identifier, type: 'login' })
      if (response?.email) {
        router.push({
          pathname: '/otp',
          params: { 
            email: response.email,
            type: 'login',
          },
        })
      }
    } catch (error) {
      console.error('Failed to request OTP:', error)
    }
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }

  const isValidForm = identifier.length > 0

  return {
    identifier,
    setIdentifier,
    loading,
    error,
    handleLogin,
    handleForgotPassword,
    isValidForm,
  }
} 