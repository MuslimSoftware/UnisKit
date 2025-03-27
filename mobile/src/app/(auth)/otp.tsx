import React from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import { AuthScreenLayout } from '@/features/auth/components/AuthScreenLayout'
import { useOTPVerification } from '@/features/auth/hooks/useOTPVerification'

export default function OTPScreen() {
  const { theme } = useTheme()
  const {
    otp,
    setOtp,
    inputRef,
    loading,
    error,
    handleVerify,
    handleResendOTP,
    getScreenTitle,
    getScreenSubtitle,
    resendCooldown,
  } = useOTPVerification()

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
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              {
                color: theme.colors.text.primary,
                borderColor: error
                  ? theme.colors.indicators.error
                  : theme.colors.layout.border,
              },
            ]}
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter verification code"
            placeholderTextColor={theme.colors.text.secondary}
            keyboardType="number-pad"
            maxLength={6}
            autoComplete="one-time-code"
          />
          {/* {error && <ErrorMessage message={error.message} />} */}
        </View>

        <View style={styles.footer}>
          <Text>
            Didn't receive the code?{' '}
            <TouchableOpacity
              onPress={resendCooldown > 0 ? undefined : handleResendOTP}
              disabled={resendCooldown > 0}
            >
              <Text
                style={{
                  ...styles.link,
                  color: theme.colors.brand.primary,
                  opacity: loading || resendCooldown > 0 ? 0.5 : 1,
                }}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </AuthScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: Spacing.spacing.medium,
  },
  inputContainer: {
    // marginTop: Spacing.spacing.large,
  },
  input: {
    // fontSize: Typography.sizes.medium,
    // fontWeight: Typography.weights.regular,
    height: 48,
    borderWidth: 1,
    // borderRadius: Spacing.radius.medium,
    // paddingHorizontal: Spacing.spacing.medium,
    textAlign: 'center',
    letterSpacing: 8,
  },
  footer: {
    // marginTop: Spacing.spacing.medium,
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
})
