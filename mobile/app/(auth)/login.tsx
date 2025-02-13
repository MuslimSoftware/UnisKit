import React, { useState, useRef } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/theme'
import { TextSmall } from '@/components/typography'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'
import { Environment } from '@/constants/Environment'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState(
    Environment.devMode.autoFillCredentials.enabled
      ? Environment.devMode.autoFillCredentials.email
      : ''
  )
  const [password, setPassword] = useState(
    Environment.devMode.autoFillCredentials.enabled
      ? Environment.devMode.autoFillCredentials.password
      : ''
  )
  const [showPassword, setShowPassword] = useState(false)
  const theme = useTheme()
  const passwordRef = useRef<TextInput>(null)

  const handleLogin = () => {
    if (Environment.devMode.bypassAuth) {
      router.push('/otp')
      return
    }

    // TODO: Implement normal login flow
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }

  const isValidForm = identifier.length > 0 && password.length >= 6

  const handlePasswordChange = (text: string) => {
    setPassword(text)
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
    // Re-focus input to prevent text selection
    setTimeout(() => {
      passwordRef.current?.blur()
    }, 100)
  }

  const handleEmailSubmitEditing = () => {
    passwordRef.current?.focus()
  }

  return (
    <AuthScreenLayout
      title="Welcome Back"
      subtitle="Login to your account"
      buttonText="Login"
      onButtonPress={handleLogin}
      buttonDisabled={!isValidForm}
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
          placeholder="Email or phone number"
          value={identifier}
          onChangeText={setIdentifier}
          onSubmitEditing={handleEmailSubmitEditing}
          returnKeyType="next"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          placeholderTextColor={theme.input.placeholder}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            ref={passwordRef}
            style={[
              styles.input,
              styles.passwordInput,
              {
                backgroundColor: theme.input.background,
                color: theme.input.text,
                borderColor: theme.colors.border,
              },
            ]}
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoComplete="current-password"
            textContentType="password"
            returnKeyType="done"
            enablesReturnKeyAutomatically
            placeholderTextColor={theme.input.placeholder}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePassword}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleForgotPassword}>
          <TextSmall
            style={[styles.forgotPassword, { color: theme.colors.tint }]}
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
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    paddingRight: 50,
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 4,
    zIndex: 1,
  },
  forgotPassword: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontWeight: Typography.weights.medium,
  },
})
