import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
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
  const [internalError, setInternalError] = useState<string | null>(null); // New state for non-API errors
  
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

  // Derived state for user-facing error message (includes internalError)
  const errorMessage = useMemo(() => internalError || rawError?.message || '', [rawError, internalError]);

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
  const sendOTP = useCallback(async () => {
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
  }, [email, requestOTPApi])

  const handleResendOTP = useCallback(async () => {
    if (resendCooldown > 0) return
    await sendOTP()
  }, [resendCooldown, sendOTP])

  const handleVerify = useCallback(async () => {
    if (isLoading) {
      console.log('handleVerify skipped: Already loading')
      return
    }

    if (!email || !otp) {
      console.error('Email and OTP are required for verification')
      return
    }
    
    // Reset potential previous errors before trying
    // Note: User requested not to reset internalError based on OTP change alone
    setInternalError(null); 

    try {
      // --- Step 1: Validate OTP --- 
      const validateResponse = await validateOTPApi.execute({ email, otp })

      // Check for error AFTER execution OR missing token
      if (validateOTPApi.error || !validateResponse?.token) {
        console.error('OTP Validation failed:', validateOTPApi.error || 'No token received')
        // Error message is already set via useMemo, just stop the process.
        return
      }

      const { token } = validateResponse

      // --- Step 2: Authenticate with Token ---
      const authResponse = await authApi.execute({ token })

      // Check for error AFTER execution OR missing tokens
      if (authApi.error || !authResponse?.access_token || !authResponse?.refresh_token) {
        console.error('Authentication failed:', authApi.error || 'Incomplete auth response')
        // Error message is already set via useMemo, just stop the process.
        return
      }

      // --- Success Path --- 
      const { access_token, refresh_token } = authResponse

      // --- Store Tokens Step --- 
      try {
        await Promise.all([
          SecureStore.setItemAsync('access_token', access_token),
          SecureStore.setItemAsync('refresh_token', refresh_token),
        ]);

        signIn(); // Only called if BOTH API calls AND storage succeed

      } catch (storageError) {
        // Handle storage-specific errors
        console.error('Failed to save tokens:', storageError);
        setInternalError('Failed to save your session. Please try again.');
        return; // Stop execution if storage fails
      }

    } catch (error) {
      // This outer catch handles errors from validate/auth steps primarily
      // or other unexpected errors before the storage step.
      console.error('Verification API process failed:', error);
      // The errorMessage state will be set by the failed useApi hook.
      // We could set a generic internal error if no API error was caught:
      if (!validateOTPApi.error && !authApi.error && !internalError) {
         setInternalError('An unexpected error occurred during verification.');
       }
    }
  }, [email, otp, isLoading, validateOTPApi, authApi, signIn])

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