import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { router } from 'expo-router'
import { useTheme } from '@/shared/hooks/theme'
import { Typography } from '@/shared/constants/Typography'
import { Spacing } from '@/shared/constants/Spacing'
import { AuthScreenLayout } from '@/features/auth/components/AuthScreenLayout'
import { ErrorMessage } from '@/shared/components/ui/text'

export default function EmailScreen() {
  const theme = useTheme()
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
              backgroundColor: theme.input.background,
              color: theme.input.text,
              borderColor: error ? theme.colors.error : theme.colors.border,
            },
          ]}
          placeholder="email@example.com"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          placeholderTextColor={theme.input.placeholder}
        />
        {error ? <ErrorMessage message={error} /> : null}
      </View>
    </AuthScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.spacing.medium,
    marginBottom: Spacing.spacing.xlarge,
    width: '100%',
  },
  input: {
    padding: Spacing.layout.section,
    borderRadius: Spacing.radius.card,
    fontSize: Typography.sizes.medium,
    width: '100%',
    borderWidth: 1,
  },
})
