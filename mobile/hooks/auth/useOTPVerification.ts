import { useState, useRef, useEffect } from 'react'
import { TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useFetch } from '@/hooks/api/useFetch'
import { Environment } from '@/constants/Environment'
import { useAuth } from '@/context/AuthContext'

type VerificationType = 'login' | 'signup' | 'reset-password'

interface VerifyOTPResponse {
  access_token: string
  token_type: string
}

export function useOTPVerification() {
  const [otp, setOtp] = useState('')
  const inputRef = useRef<TextInput>(null)
  const { signIn } = useAuth()

  const params = useLocalSearchParams<{
    type?: VerificationType
    email?: string
  }>()
  const verificationType = params.type || 'signup'
  const email = params.email

  const {
    fetch: verifyOTP,
    loading,
    error,
  } = useFetch<VerifyOTPResponse>((params) => ({
    url: `${Environment.apiUrl}/auth/verify-otp`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  }))

  useEffect(() => {
    // Auto-focus the input when the screen mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 500)

    if (Environment.devMode.bypassAuth) {
      // Auto-fill OTP in dev mode
      setOtp('123456')
    }

    return () => clearTimeout(timer)
  }, [])

  const handleVerify = async () => {
    if (Environment.devMode.bypassAuth) {
      handleVerificationSuccess()
      return
    }

    if (!email) {
      console.error('Email is required for OTP verification')
      return
    }

    try {
      const response = await verifyOTP({ email, otp })
      if (response?.access_token) {
        handleVerificationSuccess()
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error)
    }
  }

  const handleVerificationSuccess = () => {
    switch (verificationType) {
      case 'reset-password':
        router.push('/reset-password')
        break
      case 'signup':
      case 'login':
      default:
        signIn()
        break
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const getScreenTitle = () => {
    switch (verificationType) {
      case 'reset-password':
        return 'Reset Password'
      case 'signup':
      default:
        return 'Verify Your Email'
    }
  }

  const getScreenSubtitle = () => {
    switch (verificationType) {
      case 'reset-password':
        return 'Enter the 6-digit code we sent to reset your password'
      case 'signup':
      default:
        return 'Enter the 6-digit code we sent to your email'
    }
  }

  return {
    otp,
    setOtp,
    inputRef,
    loading,
    error,
    handleVerify,
    focusInput,
    getScreenTitle,
    getScreenSubtitle,
  }
} 