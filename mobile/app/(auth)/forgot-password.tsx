import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { router } from 'expo-router'
import { useTheme } from '@/hooks/theme'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'
import { Environment } from '@/constants/Environment'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState(
    Environment.devMode.autoFillCredentials.enabled
      ? Environment.devMode.autoFillCredentials.email
      : ''
  )
  const theme = useTheme()

  const handleResetPassword = () => {
    if (Environment.devMode.bypassAuth) {
      // In dev mode, go straight to OTP verification
      router.push('/otp?type=reset-password')
      return
    }

    // TODO: Implement password reset flow
    router.push('/otp?type=reset-password')
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <AuthScreenLayout
      title="Reset Password"
      subtitle="Enter your email and we'll send you a code to reset your password"
      buttonText="Send Reset Code"
      onButtonPress={handleResetPassword}
      buttonDisabled={!isValidEmail(email)}
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
