import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import { AuthScreenLayout } from '@/features/auth/components/AuthScreenLayout'
import { useOTPVerification } from '@/features/auth/hooks/useOTPVerification'
import { OtpInput } from '@/features/auth/components/OtpInput'
import { TextCaption, TextLink } from '@/shared/components/text'
import { Column } from '@/shared/components/layout'

export default function OTPScreen() {
  const { theme } = useTheme()
  const {
    otp,
    setOtp,
    loading,
    error,
    handleVerify,
    handleResendOTP,
    getScreenTitle,
    getScreenSubtitle,
    resendCooldown,
  } = useOTPVerification()

  const errorMessage =
    typeof error === 'string'
      ? error
      : (error as any)?.message || 'An error occurred'

  return (
    <AuthScreenLayout
      title={getScreenTitle()}
      subtitle={getScreenSubtitle()}
      buttonText={loading ? 'Verifying...' : 'Verify'}
      onButtonPress={handleVerify}
      buttonDisabled={otp.length !== 6 || loading}
    >
      <Column style={styles.container}>
        <View style={styles.inputContainer}>
          <OtpInput
            value={otp}
            onChangeText={setOtp}
            digitCount={6}
            error={!!error}
          />
          {error && (
            <TextCaption
              color={theme.colors.indicators.error}
              style={styles.errorText}
            >
              {errorMessage}
            </TextCaption>
          )}
        </View>

        <View style={styles.footerRow}>
          <TextCaption>Didn't receive the code? </TextCaption>
          <TouchableOpacity
            onPress={resendCooldown > 0 ? undefined : handleResendOTP}
            disabled={resendCooldown > 0 || loading}
            style={{ opacity: loading || resendCooldown > 0 ? 0.5 : 1 }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <TextLink>
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}
            </TextLink>
          </TouchableOpacity>
        </View>
      </Column>
    </AuthScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  otpInputText: {
    textAlign: 'center',
    letterSpacing: 8,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  errorText: {
    marginTop: 8,
    textAlign: 'left',
    width: '100%',
  },
})
