import { useState, useEffect, useMemo } from 'react'
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

  // Combined raw error from API hooks
  const rawError = requestOTPApi.error || validateOTPApi.error || authApi.error

  // Derived state for user-facing error message
  const errorMessage = useMemo(() => rawError?.message || '', [rawError])

  // Reset API errors when OTP changes (to clear previous validation errors)
  useEffect(() => {
    if (otp) {
      validateOTPApi.reset()
      authApi.reset()
    }
  }, [otp])

  // Computed loading state
  const isLoading = requestOTPApi.loading || validateOTPApi.loading || authApi.loading

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
      // Error is caught and processed by the useMemo above
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
      const validateResponse = await validateOTPApi.execute({ email, otp })
      if (!validateResponse) {
        // Let the hook's errorMessage handle display
        return
      }
      const { token } = validateResponse

      const authResponse = await authApi.execute({ token })
      if (!authResponse) {
        // Let the hook's errorMessage handle display
        return
      }
      const { access_token, refresh_token } = authResponse

      await Promise.all([
        SecureStore.setItemAsync('access_token', access_token),
        SecureStore.setItemAsync('refresh_token', refresh_token),
      ])
      
      signIn()
    } catch (error) {
      // Error is caught and processed by the useMemo above
      console.error('Verification process failed:', error)
    }
  }

  return {
    // Input state
    otp,
    setOtp,

    // Expose the processed error message, not the raw error
    errorMessage,

    // Loading and error states
    loading: isLoading,

    // Actions
    handleVerify,
    handleResendOTP,

    // UI helpers
    resendCooldown,
  }
} 