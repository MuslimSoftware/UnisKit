import React from 'react'
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
import { Spacing } from '@/constants/Spacing'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'
import { Typography } from '@/constants/Typography'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useResetPasswordFlow } from '@/hooks/auth/useResetPasswordFlow'

export default function ResetPasswordScreen() {
  const theme = useTheme()
  const {
    password,
    confirmPassword,
    showPasswords,
    passwordRef,
    confirmPasswordRef,
    loading,
    error,
    handleResetPassword,
    togglePasswords,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handlePasswordSubmit,
    isValidForm,
  } = useResetPasswordFlow()

  return (
    <AuthScreenLayout
      title="Create New Password"
      subtitle="Enter your new password below"
      buttonText={loading ? 'Resetting...' : 'Reset Password'}
      onButtonPress={handleResetPassword}
      buttonDisabled={!isValidForm || loading}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.passwordContainer}>
            <TextInput
              ref={passwordRef}
              style={[
                styles.input,
                {
                  backgroundColor: theme.input.background,
                  color: theme.input.text,
                  borderColor: error ? theme.colors.error : theme.colors.border,
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
              placeholderTextColor={theme.input.placeholder}
              editable={!loading}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={togglePasswords}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              disabled={loading}
            >
              <Ionicons
                name={showPasswords ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={theme.colors.text}
                style={{ opacity: loading ? 0.5 : 1 }}
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
                  borderColor: error ? theme.colors.error : theme.colors.border,
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
              editable={!loading}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={togglePasswords}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              disabled={loading}
            >
              <Ionicons
                name={showPasswords ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={theme.colors.text}
                style={{ opacity: loading ? 0.5 : 1 }}
              />
            </TouchableOpacity>
          </View>

          <ErrorMessage
            message={error?.message}
            fallback="Failed to reset password. Please try again."
          />
        </View>
      </TouchableWithoutFeedback>
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
})
