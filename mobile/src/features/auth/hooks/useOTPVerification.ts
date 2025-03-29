import { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useApi } from '@/api/useApi'
import { useAuth } from '@/features/auth/context/AuthContext'
import * as SecureStore from 'expo-secure-store'
import { requestOTP, validateOTP, authenticate } from '@/api/endpoints/authApi'
import {
  RequestOTPResponse,
  ValidateOTPResponse,
  AuthResponse,
  OTPRequest,
  ValidateOTPRequest,
  AuthRequest
} from '@/api/types/auth.types'

const COOLDOWN_DURATION = 30 // seconds

export function useOTPVerification() {
  // State
  const [otp, setOtp] = useState('')
  const [resendCooldown, setResendCooldown] = useState(COOLDOWN_DURATION)
  
  // Hooks
  const { signIn } = useAuth()
  const { email } = useLocalSearchParams<{ email?: string }>()
  
  // API hooks
  const requestOTPApi = useApi<
    RequestOTPResponse,
    [OTPRequest]
  >(requestOTP)
  const validateOTPApi = useApi<
    ValidateOTPResponse,
    [ValidateOTPRequest]
  >(validateOTP)
  const authApi = useApi<
    AuthResponse,
    [AuthRequest]
  >(authenticate)

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

  // API handlers
  const sendOTP = async () => {
    if (!email) {
      console.warn('Cannot send OTP without email')
      return
    }

    try {
      await requestOTPApi.execute({ email })
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
    if (!email || !otp) {
      console.error('Email and OTP are required for verification')
      return
    }

    try {
      // Step 1: Validate OTP
      const validateResponse = await validateOTPApi.execute({ email, otp })
      if (!validateResponse) {
        console.error('validateOTPApi execute failed or returned null')
        return
      }
      const { token } = validateResponse

      // Step 2: Use the token to authenticate
      const authResponse = await authApi.execute({ token })
      if (!authResponse) {
        console.error('authApi execute failed or returned null')
        return
      }
      const { access_token, refresh_token } = authResponse

      // Step 3: Store tokens and sign in
      await Promise.all([
        SecureStore.setItemAsync('access_token', access_token),
        SecureStore.setItemAsync('refresh_token', refresh_token),
      ])
      
      signIn()
    } catch (error) {
      console.error('Verification process failed:', error)
    }
  }

  return {
    // Input state
    otp,
    setOtp,

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