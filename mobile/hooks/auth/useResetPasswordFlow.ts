import { useState, useRef } from 'react'
import { TextInput } from 'react-native'
import { useFetch } from '@/hooks/api/useFetch'
import { Environment } from '@/constants/Environment'
import { useAuth } from '@/context/AuthContext'

interface ResetPasswordResponse {
  message: string
}

export function useResetPasswordFlow() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)
  const { signIn } = useAuth()

  const {
    fetch: resetPassword,
    loading,
    error: apiError,
  } = useFetch<ResetPasswordResponse>((params) => ({
    url: `${Environment.apiUrl}/auth/reset-password`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  }))

  const handleResetPassword = async () => {
    if (Environment.devMode.bypassAuth) {
      signIn()
      return
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(new Error('Passwords do not match'))
      return
    }

    try {
      const response = await resetPassword({ password })
      if (response) {
        signIn()
      }
    } catch (error) {
      console.error('Failed to reset password:', error)
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
    handleResetPassword,
    togglePasswords,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handlePasswordSubmit,
    isValidForm,
  }
} 