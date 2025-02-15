import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useTheme } from '@/hooks/theme'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useEmailSignup } from '@/hooks/auth/useEmailSignup'

export default function EmailScreen() {
  const theme = useTheme()
  const { email, setEmail, loading, error, handleContinue, isValidEmail } =
    useEmailSignup()

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
              borderColor: error ? theme.colors.error : theme.colors.border,
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
        <ErrorMessage
          message={error?.message}
          fallback="Failed to send verification code. Please try again."
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
