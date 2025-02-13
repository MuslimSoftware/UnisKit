import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, TextInput, View, Pressable } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useTheme } from '@/hooks/theme'
import {
  TextBody,
  TextLarge,
  TextSmall,
  TextXLarge,
} from '@/components/typography'
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
          <TextXLarge style={[styles.otpText, { color: theme.input.text }]}>
            {otp[i] || ''}
          </TextXLarge>
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
      <View style={styles.container}>
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
  },
  otpBox: {
    width: 40,
    height: 48,
    borderRadius: Spacing.radius.card,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {},
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  link: {
    fontWeight: Typography.weights.medium,
  },
})
