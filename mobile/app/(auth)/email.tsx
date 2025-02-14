import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { router } from 'expo-router'
import { useTheme } from '@/hooks/theme'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'
import { Environment } from '@/constants/Environment'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'
import { useFetch } from '@/hooks/api/useFetch'
import { authService } from '@/services/auth'

export default function EmailScreen() {
  const [email, setEmail] = useState(
    Environment.devMode.autoFillCredentials.enabled
      ? Environment.devMode.autoFillCredentials.email
      : ''
  )
  const theme = useTheme()
  const { fetch: requestOTP, loading } = useFetch(authService.requestOTP)

  const handleContinue = async () => {
    if (Environment.devMode.bypassAuth) {
      router.push({
        pathname: '/otp',
        params: { email },
      })
      return
    }

    try {
      const response = await requestOTP(email)
      if (response) {
        // OTP has been sent, navigate to OTP screen
        router.push({
          pathname: '/otp',
          params: { email },
        })
      }
    } catch (error) {
      console.error('Failed to send OTP:', error)
      // TODO: Handle error (show error message, etc.)
    }
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <AuthScreenLayout
      title="Enter Your Email"
      subtitle="We'll send you a verification code"
      buttonText={loading ? 'Sending code...' : 'Continue'}
      onButtonPress={handleContinue}
      buttonDisabled={!isValidEmail(email) || loading}
    >
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.input.background,
              color: theme.input.text,
              borderColor: theme.colors.border,
            },
          ]}
          placeholder="email@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          placeholderTextColor={theme.input.placeholder}
          editable={!loading}
        />
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
