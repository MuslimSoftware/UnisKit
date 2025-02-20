import { useState } from 'react'
import { router } from 'expo-router'
import { useFetch } from '@/hooks/api/useFetch'
import { Environment } from '@/constants/Environment'

interface VerifyCredentialsResponse {
    valid: boolean
    message: string
    otp_token: string | null
}

export function useLoginFlow() {
  const [email, setEmail] = useState(
    Environment.devMode.autoFillCredentials?.email || ''
  )
  const [password, setPassword] = useState(
    Environment.devMode.autoFillCredentials?.password || ''
  )
  const [error, setError] = useState<Error | null>(null)

  const {
    fetch: verifyCredentials,
    loading,
    error: verifyError,
  } = useFetch<VerifyCredentialsResponse>(() => ({
    url: `${Environment.apiUrl}/auth/verify-credentials`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  }))

  const handleLogin = async () => {
    if (Environment.devMode.bypassAuth) {
      router.push({
        pathname: '/otp',
        params: { email, type: 'login'}
      })
      return
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError(new Error('Please enter a valid email address'))
      return
    }

    // Validate password
    if (password.length < 6) {
      setError(new Error('Password must be at least 6 characters'))
      return
    }

    try {
      const response = await verifyCredentials()
      if (!response || !response.valid) {
        throw new Error(response?.message || 'Failed to verify credentials')
      }

      // Credentials verified, proceed to OTP page
      router.push({
        pathname: '/otp',
        params: { email, type: 'login', token: response.otp_token }
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to verify credentials'))
    }
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }

  const isValidForm = email.length > 0 && password.length >= 6

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error: verifyError || error,
    handleLogin,
    handleForgotPassword,
    isValidForm,
  }
}