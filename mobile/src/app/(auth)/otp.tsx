import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { AuthScreenLayout } from '@/features/auth/components/AuthScreenLayout'
import { useOTPVerification } from '@/features/auth/hooks/useOTPVerification'
import { OtpInput } from '@/features/auth/components/OtpInput'
import { TextCaption, TextLink } from '@/shared/components/text'
import { Column } from '@/shared/components/layout'

export default function OTPScreen() {
  const {
    otp,
    setOtp,
    loading,
    errorMessage,
    handleVerify,
    handleResendOTP,
    resendCooldown,
  } = useOTPVerification()

  return (
    <AuthScreenLayout
      title="Verify Your Email"
      subtitle="Enter the 6-digit code we sent to your email"
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
            error={!!errorMessage}
            errorMessage={errorMessage}
          />
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
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
})
