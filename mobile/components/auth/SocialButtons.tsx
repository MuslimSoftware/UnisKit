import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button } from '@/components/Button'
import { Spacing } from '@/constants/Spacing'

interface ButtonStyles {
  background: string
  text: string
  icon: string
  border?: string
}

interface SocialButtonsProps {
  onEmailSignup: () => void
  googleStyles: ButtonStyles
  appleStyles: ButtonStyles
}

export function SocialButtons({
  onEmailSignup,
  googleStyles,
  appleStyles,
}: SocialButtonsProps) {
  return (
    <View style={styles.buttonsContainer}>
      <Button
        icon="mail-outline"
        text="Continue with Email"
        onPress={onEmailSignup}
        align="left"
      />

      <Button
        icon={
          <Image
            source={require('../../assets/images/google.png')}
            style={{ width: 24, height: 24 }}
          />
        }
        text="Continue with Google"
        onPress={() => {}}
        align="left"
        backgroundColor={googleStyles.background}
        borderColor={googleStyles.border}
        textColor={googleStyles.text}
      />

      <Button
        icon="logo-apple"
        text="Continue with Apple"
        onPress={() => {}}
        align="left"
        backgroundColor={appleStyles.background}
        textColor={appleStyles.text}
        iconColor={appleStyles.icon}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    gap: Spacing.gap.sm,
  },
})
