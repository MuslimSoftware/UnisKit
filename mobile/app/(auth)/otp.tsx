import React from 'react'
import { StyleSheet, TextInput, View, Pressable } from 'react-native'
import { useTheme } from '@/hooks/theme'
import { TextSmall, TextXLarge } from '@/components/typography'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useOTPVerification } from '@/hooks/auth/useOTPVerification'

export default function OTPScreen() {
  const theme = useTheme()
  const {
    otp,
    setOtp,
    inputRef,
    verifyLoading,
    verifyError,
    registerLoading,
    registerError,
    loginLoading,
    loginError,
    handleVerify,
    focusInput,
    getScreenTitle,
    getScreenSubtitle,
  } = useOTPVerification()

  const loading = verifyLoading || registerLoading || loginLoading
  const error = verifyError || registerError || loginError

  return (
    <AuthScreenLayout
      title={getScreenTitle()}
      subtitle={getScreenSubtitle()}
      buttonText={loading ? 'Verifying...' : 'Verify'}
      onButtonPress={handleVerify}
      buttonDisabled={otp.length !== 6 || loading}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.otpBoxesContainer}>
            {/** Render the OTP boxes */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Pressable
                key={index}
                style={[
                  styles.otpBox,
                  {
                    backgroundColor: theme.input.background,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <TextXLarge
                  style={[styles.otpText, { color: theme.input.text }]}
                >
                  {otp[index] || ''}
                </TextXLarge>
              </Pressable>
            ))}
            {/** The hidden input */}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
              caretHidden
              editable={!loading}
            />
          </View>
          <ErrorMessage
            message={error?.message}
            fallback="Failed to verify code. Please try again."
          />
          <TextSmall variant="secondary">
            Didn't receive the code?{' '}
            <TextSmall style={[styles.link, { color: theme.colors.tint }]}>
              Resend
            </TextSmall>
          </TextSmall>
        </View>
      </View>
    </AuthScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.spacing.medium,
    marginBottom: Spacing.spacing.xlarge,
  },
  inputContainer: {
    gap: Spacing.spacing.medium,
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  otpBox: {
    width: 40,
    height: 48,
    borderRadius: Spacing.radius.card,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: Typography.sizes.otpInput,
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 1,
  },
  link: {
    fontWeight: Typography.weights.medium,
  },
})
