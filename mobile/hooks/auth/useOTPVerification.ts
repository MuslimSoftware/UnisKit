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
  valid: boolean
  message: string
  completion_token: string
}

interface RequestOTPResponse {
  email: string
  message: string
}

export function useOTPVerification() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState<Error | null>(null)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRef = useRef<TextInput>(null)
  const { signIn } = useAuth()

  const params = useLocalSearchParams<{
    type?: VerificationType
    email?: string
    token?: string
  }>()
  const verificationType = params.type || 'signup'
  const email = params.email
  const token = params.token


  // Start cooldown timer when component mounts
  useEffect(() => {
    startResendCooldown()
  }, [])

  // Handle cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return

    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [resendCooldown])

  const startResendCooldown = () => {
    setResendCooldown(30) // 30 seconds cooldown
  }

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
      body: JSON.stringify({ email, otp_token: token }),
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
      body: JSON.stringify({ email, completion_token: token }),
    },
  }))

  const {
    fetch: verifyOTP,
    loading: otpVerifyLoading,
    error: otpVerifyError,
  } = useFetch<VerifyOTPResponse>(() => ({
    url: `${Environment.apiUrl}/auth/validate-otp`,
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
        if (!token) {
          throw new Error('Token is required')
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
    if (resendCooldown > 0) return
    
    setError(null)
    try {
      const response = await requestOTP()
      if (!response) {
        throw new Error('Failed to resend verification code')
      }
      startResendCooldown()
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
      // For all flows, first verify the OTP
      const verifyResponse = await verifyOTP()
      if (!verifyResponse) {
        throw new Error('Failed to verify OTP')
      }

      // After OTP is verified, handle specific flows
      if (verificationType === 'login') {
        const response = await login()
        if (!response) {
          throw new Error('Failed to login')
        }
        if (response.access_token) {
          // Store tokens in secure storage
          await SecureStore.setItemAsync('access_token', response.access_token)
          await SecureStore.setItemAsync('refresh_token', response.refresh_token)
          signIn()
        }
      } else if (verificationType === 'signup') {
        if (verifyResponse.valid) {
          router.push({
            pathname: '/password',
            params: { 
              email,
              signup_token: verifyResponse.completion_token,
            }
          })
        }
      } else if (verificationType === 'reset-password') {
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
    error: otpVerifyError || loginError || requestOTPError || error,
    loading: otpVerifyLoading || loginLoading || requestLoading,
    handleVerify,
    handleResendOTP,
    focusInput,
    getScreenTitle,
    getScreenSubtitle,
    resendCooldown,
  }
} 