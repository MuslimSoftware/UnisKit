import { useState, useRef, useEffect } from 'react'
import { TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useApi } from '@/api/hooks/useApi'
import { useAuth } from '@/context/AuthContext'
import * as SecureStore from 'expo-secure-store'

interface RequestOTPResponse {
  success: boolean
  message: string
  data: {
    expires_in: number
  }
}

interface ValidateOTPResponse {
  success: boolean
  message: string
  data: {
    token: string
  }
}

interface AuthResponse {
  success: boolean
  message: string
  data: {
    access_token: string
    refresh_token: string
  }
}

export function useOTPVerification() {
  const [otp, setOtp] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRef = useRef<TextInput>(null)
  const { signIn } = useAuth()

  const params = useLocalSearchParams<{ email?: string }>()
  const email = params.email

  const requestOTPApi = useApi<RequestOTPResponse>('post', '/auth/request-otp')
  const validateOTPApi = useApi<ValidateOTPResponse>('post', '/auth/validate-otp')
  const authApi = useApi<AuthResponse>('post', '/auth/auth')

  // Start cooldown timer when component mounts
  useEffect(() => {
    setResendCooldown(30) // 30 seconds cooldown
  }, [])

  // Handle cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return

    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [resendCooldown])

  useEffect(() => {
    // Auto-focus the input when the screen mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 500)

    // Request OTP when component mounts
    const sendInitialOTP = async () => {
      try {
        if (!email) {
          throw new Error('Email is required')
        }
        await requestOTPApi.execute({ email })
      } catch (error) {
        console.error('Failed to send initial OTP:', error)
      }
    }

    sendInitialOTP()
    return () => clearTimeout(timer)
  }, [email])

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return

    try {
      await requestOTPApi.execute({ email })
      setResendCooldown(30)
    } catch (error) {
      console.error('Failed to resend OTP:', error)
    }
  }

  const handleVerify = async () => {
    if (!email) {
      throw new Error('Email is required')
      return
    }

    try {
      // Step 1: Validate OTP
      const validateResponse = await validateOTPApi.execute({ email, otp })

      // Step 2: Use the token to authenticate
      const authResponse = await authApi.execute({ token: validateResponse.data.token })

      // Step 3: Store tokens and sign in
      await SecureStore.setItemAsync('access_token', authResponse.data.access_token)
      await SecureStore.setItemAsync('refresh_token', authResponse.data.refresh_token)
      signIn()
    } catch (error) {
      console.error('Verification failed:', error)
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return {
    otp,
    setOtp,
    inputRef,
    error: requestOTPApi.error || validateOTPApi.error || authApi.error,
    loading: requestOTPApi.loading || validateOTPApi.loading || authApi.loading,
    handleVerify,
    handleResendOTP,
    focusInput,
    getScreenTitle: () => 'Verify Your Email',
    getScreenSubtitle: () => 'Enter the 6-digit code we sent to your email',
    resendCooldown,
  }
} 