import React, { useState, useRef } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/theme'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'
import { Environment } from '@/constants/Environment'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'
import { useAuth } from '@/context/AuthContext'

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)
  const theme = useTheme()
  const { signIn } = useAuth()

  const handleResetPassword = () => {
    if (Environment.devMode.bypassAuth) {
      signIn()
      return
    }

    // TODO: Implement password reset API call
    signIn()
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
  }

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text)
  }

  const handlePasswordSubmit = () => {
    confirmPasswordRef.current?.focus()
  }

  const isValidForm = password.length >= 6 && password === confirmPassword

  return (
    <AuthScreenLayout
      title="Create New Password"
      subtitle="Enter your new password below"
      buttonText="Reset Password"
      onButtonPress={handleResetPassword}
      buttonDisabled={!isValidForm}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <View style={styles.passwordContainer}>
            <TextInput
              ref={passwordRef}
              style={[
                styles.input,
                {
                  backgroundColor: theme.input.background,
                  color: theme.input.text,
                  borderColor: theme.colors.border,
                },
              ]}
              placeholder="New password"
              value={password}
              onChangeText={handlePasswordChange}
              onSubmitEditing={handlePasswordSubmit}
              secureTextEntry={!showPasswords}
              autoCapitalize="none"
              autoComplete="new-password"
              textContentType="newPassword"
              returnKeyType="next"
              blurOnSubmit={false}
              placeholderTextColor={theme.input.placeholder}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={togglePasswords}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showPasswords ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              ref={confirmPasswordRef}
              style={[
                styles.input,
                {
                  backgroundColor: theme.input.background,
                  color: theme.input.text,
                  borderColor: theme.colors.border,
                },
              ]}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={!showPasswords}
              autoCapitalize="none"
              autoComplete="new-password"
              textContentType="newPassword"
              returnKeyType="done"
              placeholderTextColor={theme.input.placeholder}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={togglePasswords}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showPasswords ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </AuthScreenLayout>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: Spacing.gap.md,
    marginBottom: Spacing.margin.xl,
  },
  input: {
    flex: 1,
    padding: Spacing.padding.button,
    borderRadius: Spacing.borderRadius.card,
    fontSize: Typography.sizes.body,
    borderWidth: 1,
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
})
