import { useState, useRef, useEffect } from 'react'
import { TextInput } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useApi } from '@/api/hooks/useApi'
import { useAuth } from '@/context/AuthContext'
import * as SecureStore from 'expo-secure-store'
import { requestOTP, validateOTP, authenticate } from '@/api/endpoints/authApi'

const COOLDOWN_DURATION = 30 // seconds
const AUTO_FOCUS_DELAY = 500 // milliseconds

export function useOTPVerification() {
  // State
  const [otp, setOtp] = useState('')
  const [resendCooldown, setResendCooldown] = useState(COOLDOWN_DURATION)
  
  // Refs
  const inputRef = useRef<TextInput>(null)
  
  // Hooks
  const { signIn } = useAuth()
  const { email } = useLocalSearchParams<{ email?: string }>()
  
  // API hooks
  const requestOTPApi = useApi(requestOTP)
  const validateOTPApi = useApi(validateOTP)
  const authApi = useApi(authenticate)

  // Computed values
  const isLoading = requestOTPApi.loading || validateOTPApi.loading || authApi.loading
  const error = requestOTPApi.error || validateOTPApi.error || authApi.error

  // Timer management
  useEffect(() => {
    if (resendCooldown <= 0) return

    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [resendCooldown])

  // Input management
  const focusInput = () => {
    inputRef.current?.focus()
  }

  useEffect(() => {
    const timer = setTimeout(focusInput, AUTO_FOCUS_DELAY)
    return () => clearTimeout(timer)
  }, [])

  // API handlers
  const sendOTP = async () => {
    if (!email) {
      throw new Error('Email is required')
    }
    
    try {
      await requestOTPApi.execute(email)
      setResendCooldown(COOLDOWN_DURATION)
    } catch (error) {
      console.error('Failed to send OTP:', error)
    }
  }

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return
    await sendOTP()
  }

  const handleVerify = async () => {
    if (!email) {
      throw new Error('Email is required')
    }

    try {
      // Step 1: Validate OTP
      const { token } = await validateOTPApi.execute(email, otp)

      // Step 2: Use the token to authenticate
      const { access_token, refresh_token } = await authApi.execute(token)

      // Step 3: Store tokens and sign in
      await Promise.all([
        SecureStore.setItemAsync('access_token', access_token),
        SecureStore.setItemAsync('refresh_token', refresh_token),
      ])
      
      signIn()
    } catch (error) {
      console.error('Verification failed:', error)
    }
  }

  // Initial OTP request
  useEffect(() => {
    sendOTP()
  }, [email])

  return {
    // Input state
    otp,
    setOtp,
    inputRef,
    focusInput,

    // Loading and error states
    error,
    loading: isLoading,

    // Actions
    handleVerify,
    handleResendOTP,

    // UI helpers
    getScreenTitle: () => 'Verify Your Email',
    getScreenSubtitle: () => 'Enter the 6-digit code we sent to your email',
    resendCooldown,
  }
} 