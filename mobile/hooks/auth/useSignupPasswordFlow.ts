import { useState, useRef } from 'react'
import { TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useFetch } from '@/hooks/api/useFetch'
import { Environment } from '@/constants/Environment'
import { useAuth } from '@/context/AuthContext'
import * as SecureStore from 'expo-secure-store'

interface CompleteSignupResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export function useSignupPasswordFlow() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const params = useLocalSearchParams<{
    email?: string
    signup_token?: string
  }>()
  const email = params.email
  const signupToken = params.signup_token
  
  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)
  const { signIn } = useAuth()

  const {
    fetch: completeSignup,
    loading,
    error: apiError,
  } = useFetch<CompleteSignupResponse>(() => ({
    url: `${Environment.apiUrl}/auth/complete-signup`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        signup_token: signupToken,
        password,
      }),
    },
  }))

  const handleSignup = async () => {
    if (Environment.devMode.bypassAuth) {
      signIn()
      return
    }

    if (!signupToken) {
      setError(new Error('Missing signup token'))
      return
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(new Error('Passwords do not match'))
      return
    }

    try {
      const response = await completeSignup()
      if (!response) throw new Error('Failed to complete signup')

      // Store tokens in secure storage
      await SecureStore.setItemAsync('access_token', response.access_token)
      await SecureStore.setItemAsync('refresh_token', response.refresh_token)

      // Sign in the user
      signIn()
    } catch (error) {
      console.error('Failed to complete signup:', error)
    }
  }

  const togglePasswords = () => {
    setShowPasswords(!showPasswords)
    // Re-focus inputs to prevent text selection
    setTimeout(() => {
      passwordRef.current?.blur()
      confirmPasswordRef.current?.blur()
    }, 100)
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text)
    // Clear error when user types
    if (error) setError(null)
  }

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text)
    // Clear error when user types
    if (error) setError(null)
  }

  const handlePasswordSubmit = () => {
    confirmPasswordRef.current?.focus()
  }

  const isValidForm = password.length >= 6 && password === confirmPassword

  return {
    password,
    confirmPassword,
    showPasswords,
    passwordRef,
    confirmPasswordRef,
    loading,
    error: error || apiError,
    handleSignup,
    togglePasswords,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handlePasswordSubmit,
    isValidForm,
  }
} 