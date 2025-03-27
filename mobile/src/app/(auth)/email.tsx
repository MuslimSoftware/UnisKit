import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { router } from 'expo-router'
import { useTheme } from '@/shared/context/ThemeContext'
import { AuthScreenLayout } from '@/features/auth/components/AuthScreenLayout'

export default function EmailScreen() {
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateEmail = (email: string) => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return false
    }
    setError(null)
    return true
  }

  const handleEmailChange = (text: string) => {
    setEmail(text)
  }

  const handleContinue = () => {
    if (!validateEmail(email)) {
      return
    }
    router.push({
      pathname: '/otp',
      params: { email },
    })
  }

  return (
    <AuthScreenLayout
      title="Enter Your Email"
      subtitle="We'll send you a verification code"
      buttonText="Continue"
      onButtonPress={handleContinue}
      buttonDisabled={!isValidEmail(email)}
    >
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.layout.background,
              color: theme.colors.text.primary,
              borderColor: error
                ? theme.colors.indicators.error
                : theme.colors.layout.border,
            },
          ]}
          placeholder="email@example.com"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          placeholderTextColor={theme.colors.text.secondary}
        />
        {/* {error ? <ErrorMessage message={error} /> : null} */}
      </View>
    </AuthScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
  },
})
