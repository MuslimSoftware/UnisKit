import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { router } from 'expo-router'
import { useTheme } from '@/hooks/theme'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'
import { Environment } from '@/constants/Environment'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'

export default function EmailScreen() {
  const [email, setEmail] = useState(
    Environment.devMode.autoFillCredentials.enabled
      ? Environment.devMode.autoFillCredentials.email
      : ''
  )
  const theme = useTheme()

  const handleContinue = () => {
    if (Environment.devMode.bypassAuth) {
      // Even in dev mode, we should go to OTP screen
      router.push('/otp')
      return
    }

    // TODO: Implement normal email verification flow
    router.push('/otp')
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <AuthScreenLayout
      title="Enter Your Email"
      subtitle="We'll send you a verification code"
      buttonText="Continue"
      onButtonPress={handleContinue}
      buttonDisabled={!isValidEmail(email)}
    >
      <View style={styles.inputContainer}>
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
  inputContainer: {
    gap: Spacing.gap.md,
    marginBottom: Spacing.margin.xl,
  },
  input: {
    padding: Spacing.padding.button,
    borderRadius: Spacing.borderRadius.card,
    fontSize: Typography.sizes.body,
    borderWidth: 1,
  },
})
