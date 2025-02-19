import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/theme'
import { TextSmall } from '@/components/typography'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useLoginFlow } from '@/hooks/auth/useLoginFlow'

export default function LoginScreen() {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
    handleForgotPassword,
    isValidForm,
  } = useLoginFlow()

  return (
    <AuthScreenLayout
      title="Welcome Back"
      subtitle="Enter your credentials to continue"
      buttonText={loading ? 'Verifying...' : 'Continue'}
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
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          placeholderTextColor={theme.input.placeholder}
          editable={!loading}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.input.background,
                color: theme.input.text,
                borderColor: error ? theme.colors.error : theme.colors.border,
              },
            ]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            returnKeyType="done"
            autoCapitalize="none"
            autoComplete="password"
            placeholderTextColor={theme.input.placeholder}
            editable={!loading}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            disabled={loading}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={theme.colors.text}
              style={{ opacity: loading ? 0.5 : 1 }}
            />
          </TouchableOpacity>
        </View>

        <ErrorMessage
          message={error?.message}
          fallback="Failed to verify credentials. Please try again."
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
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  forgotPassword: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontWeight: Typography.weights.medium,
  },
})
