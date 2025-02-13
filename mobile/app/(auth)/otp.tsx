import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, TextInput, View, Pressable } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useTheme } from '@/hooks/theme'
import { TextSmall } from '@/components/typography'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'
import { useAuth } from '@/context/AuthContext'
import { Environment } from '@/constants/Environment'
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout'

type VerificationType = 'signup' | 'reset-password'

export default function OTPScreen() {
  const [otp, setOtp] = useState('')
  const inputRef = useRef<TextInput>(null)
  const theme = useTheme()
  const { signIn } = useAuth()
  const params = useLocalSearchParams<{ type?: VerificationType }>()
  const verificationType = params.type || 'signup'

  useEffect(() => {
    if (Environment.devMode.bypassAuth) {
      // Auto-fill OTP in dev mode
      setOtp('123456')
    }
  }, [])

  const handleVerify = () => {
    if (Environment.devMode.bypassAuth) {
      handleVerificationSuccess()
      return
    }

    // TODO: Implement normal OTP verification
    handleVerificationSuccess()
  }

  const handleVerificationSuccess = () => {
    switch (verificationType) {
      case 'reset-password':
        router.push('/reset-password')
        break
      case 'signup':
      default:
        signIn()
        break
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const getScreenTitle = () => {
    switch (verificationType) {
      case 'reset-password':
        return 'Reset Password'
      case 'signup':
      default:
        return 'Verify Your Email'
    }
  }

  const getScreenSubtitle = () => {
    switch (verificationType) {
      case 'reset-password':
        return 'Enter the 6-digit code we sent to reset your password'
      case 'signup':
      default:
        return 'Enter the 6-digit code we sent to your email'
    }
  }

  const renderOTPBoxes = () => {
    const boxes = []
    for (let i = 0; i < 6; i++) {
      boxes.push(
        <Pressable
          key={i}
          onPress={focusInput}
          style={[
            styles.otpBox,
            {
              backgroundColor: theme.input.background,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <TextSmall style={[styles.otpText, { color: theme.input.text }]}>
            {otp[i] || ''}
          </TextSmall>
        </Pressable>
      )
    }
    return boxes
  }

  return (
    <AuthScreenLayout
      title={getScreenTitle()}
      subtitle={getScreenSubtitle()}
      buttonText="Verify"
      onButtonPress={handleVerify}
      buttonDisabled={otp.length !== 6}
    >
      <View style={styles.inputContainer}>
        <View style={styles.otpBoxesContainer}>
          {renderOTPBoxes()}
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
            caretHidden
          />
        </View>
        <TextSmall variant="secondary">
          Didn't receive the code?{' '}
          <TextSmall style={[styles.link, { color: theme.colors.tint }]}>
            Resend
          </TextSmall>
        </TextSmall>
      </View>
    </AuthScreenLayout>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: Spacing.gap.md,
    marginBottom: Spacing.margin.xl,
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  otpBox: {
    width: 45,
    height: 56,
    borderRadius: Spacing.borderRadius.card,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpText: {
    fontSize: Typography.sizes.otpInput,
    fontWeight: Typography.weights.medium,
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: Typography.weights.medium,
  },
})
