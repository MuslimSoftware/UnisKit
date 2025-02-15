import React from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@/hooks/theme'
import { TextSmall } from '@/components/typography'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useLoginFlow } from '@/hooks/auth/useLoginFlow'

export default function LoginScreen() {
  const theme = useTheme()
  const {
    identifier,
    setIdentifier,
    loading,
    error,
    handleLogin,
    handleForgotPassword,
  } = useLoginFlow()

  const isValidForm = identifier.length > 0

  return (
    <AuthScreenLayout
      title="Welcome Back"
      subtitle="Enter your email to continue"
      buttonText={loading ? 'Sending code...' : 'Continue'}
      onButtonPress={handleLogin}
      buttonDisabled={!isValidForm || loading}
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
          placeholder="Email or phone number"
          value={identifier}
          onChangeText={setIdentifier}
          returnKeyType="done"
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

        <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
          <TextSmall
            style={[
              styles.forgotPassword,
              {
                color: theme.colors.tint,
                opacity: loading ? 0.5 : 1,
              },
            ]}
          >
            Forgot Password?
          </TextSmall>
        </TouchableOpacity>
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
  forgotPassword: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontWeight: Typography.weights.medium,
  },
})
