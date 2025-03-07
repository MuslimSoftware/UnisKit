import { useState, useRef, useEffect } from 'react'
import { TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useFetch } from '@/hooks/api/useFetch'
import { Environment } from '@/constants/Environment'
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
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRef = useRef<TextInput>(null)
  const { signIn } = useAuth()

  const params = useLocalSearchParams<{ email?: string }>()
  const email = params.email

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

  const {
    fetch: requestOTP,
    loading: requestLoading,
  } = useFetch<RequestOTPResponse>(() => ({
    url: `${Environment.apiUrl}/auth/request-otp`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    },
  }))

  const {
    fetch: validateOTP,
  } = useFetch<ValidateOTPResponse>(() => ({
    url: `${Environment.apiUrl}/auth/validate-otp`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    },
  }))

  const {
    fetch: authenticate,
  } = useFetch<AuthResponse>(() => ({
    url: `${Environment.apiUrl}/auth/auth`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: '' }), // Will be set during handleVerify
    },
  }))

  useEffect(() => {
    // Auto-focus the input when the screen mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 500)

    // Request OTP when component mounts
    const sendInitialOTP = async () => {
      setError(null)
      try {
        if (!email) {
          throw new Error('Email is required')
        }
        console.log(`${Environment.apiUrl}/auth/request-otp`)
        const response = await requestOTP()
        console.log('OTP response:', response)
        if (!response?.success) {
          throw new Error(response?.message || 'Failed to send verification code')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send verification code')
      }
    }

    if (!Environment.devMode.bypassAuth) {
      sendInitialOTP()
    } else {
      // Auto-fill OTP in dev mode
      setOtp('123456')
    }

    return () => clearTimeout(timer)
  }, [email])

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return
    
    setError(null)
    try {
      const response = await requestOTP()
      if (!response?.success) {
        throw new Error(response?.message || 'Failed to resend verification code')
      }
      setResendCooldown(30)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification code')
    }
  }

  const handleVerify = async () => {
    if (!email) {
      setError('Email is required')
      return
    }

    if (Environment.devMode.bypassAuth) {
      signIn()
      return
    }

    setError(null)
    setLoading(true)

    try {
      // Step 1: Validate OTP
      const validateResponse = await validateOTP()
      if (!validateResponse?.success) {
        throw new Error(validateResponse?.message || 'Invalid verification code')
      }

      // Step 2: Use the token to authenticate
      const authResponse = await authenticate()
      if (!authResponse?.success) {
        throw new Error(authResponse?.message || 'Authentication failed')
      }

      // Step 3: Store tokens and sign in
      await SecureStore.setItemAsync('access_token', authResponse.data.access_token)
      await SecureStore.setItemAsync('refresh_token', authResponse.data.refresh_token)
      signIn()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return {
    otp,
    setOtp,
    inputRef,
    error,
    loading: loading || requestLoading,
    handleVerify,
    handleResendOTP,
    focusInput,
    getScreenTitle: () => 'Verify Your Email',
    getScreenSubtitle: () => 'Enter the 6-digit code we sent to your email',
    resendCooldown,
  }
} 