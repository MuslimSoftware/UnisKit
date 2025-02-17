import { useState, useRef, useEffect } from 'react'
import { TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useFetch } from '@/hooks/api/useFetch'
import { Environment } from '@/constants/Environment'
import { useAuth } from '@/context/AuthContext'
import * as SecureStore from 'expo-secure-store'

type VerificationType = 'login' | 'signup' | 'reset-password'

interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

interface VerifyOTPResponse {
  signup_token: string
  expires_in: number
}

interface RequestOTPResponse {
  email: string
  message: string
}

export function useOTPVerification() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState<Error | null>(null)
  const inputRef = useRef<TextInput>(null)
  const { signIn } = useAuth()

  const params = useLocalSearchParams<{
    type?: VerificationType
    email?: string
  }>()
  const verificationType = params.type || 'signup'
  const email = params.email

  const {
    fetch: requestOTP,
    loading: requestLoading,
    error: requestOTPError,
  } = useFetch<RequestOTPResponse>(() => ({
    url: `${Environment.apiUrl}/auth/request-otp`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        type: verificationType 
      }),
    },
  }))

  const {
    fetch: verifySignupOTP,
    loading: verifyLoading,
    error: verifyError,
  } = useFetch<VerifyOTPResponse>(() => ({
    url: `${Environment.apiUrl}/auth/verify-signup-otp`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    },
  }))

  const {
    fetch: login,
    loading: loginLoading,
    error: loginError,
  } = useFetch<LoginResponse>(() => ({
    url: `${Environment.apiUrl}/auth/login`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
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
      return () => clearTimeout(timer)
    }

    // Request OTP when component mounts
    const sendOTP = async () => {
      setError(null)
      try {
        if (!email) {
          throw new Error('Email is required')
        }
        const response = await requestOTP()
        if (!response) {
          throw new Error('Failed to send verification code')
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to send verification code'))
      }
    }

    sendOTP()
    return () => clearTimeout(timer)
  }, [email, verificationType])

  const handleResendOTP = async () => {
    setError(null)
    try {
      const response = await requestOTP()
      if (!response) {
        throw new Error('Failed to resend verification code')
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to resend verification code'))
    }
  }

  const handleVerify = async () => {
    setError(null)

    if (Environment.devMode.bypassAuth) {
      handleVerificationSuccess()
      return
    }

    if (!email) {
      setError(new Error('Email is required for OTP verification'))
      return
    }

    try {
      if (verificationType === 'login') {
        const response = await login()
        if (!response) {
          throw new Error('Failed to verify OTP')
        }
        if (response.access_token) {
          // Store tokens in secure storage
          await SecureStore.setItemAsync('access_token', response.access_token)
          await SecureStore.setItemAsync('refresh_token', response.refresh_token)
          signIn()
        }
      } else if (verificationType === 'signup') {
        const response = await verifySignupOTP()
        console.log('response', response)
        if (!response) {
          throw new Error('Failed to verify OTP')
        }
        if (response.signup_token) {
          router.push({
            pathname: '/password',
            params: { 
              email,
              signup_token: response.signup_token,
            }
          })
        }
      } else if (verificationType === 'reset-password') {
        // TODO: Implement reset password flow
        router.push('/reset-password')
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to verify code'))
    }
  }

  const handleVerificationSuccess = () => {
    switch (verificationType) {
      case 'reset-password':
        router.push('/reset-password')
        break
      case 'signup':
        router.push('/password')
        break
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
    error: verifyError || loginError || requestOTPError || error,
    loading: verifyLoading || loginLoading || requestLoading,
    handleVerify,
    handleResendOTP,
    focusInput,
    getScreenTitle,
    getScreenSubtitle,
  }
} 