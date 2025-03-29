import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PrimaryButton } from '@/shared/components/buttons/PrimaryButton'
import { AppleButton } from '@/shared/components/buttons/AppleButton'
import { GoogleButton } from '@/shared/components/buttons/GoogleButton'

interface SocialButtonsProps {
  navigateToEmail: () => void
}

export function SocialButtons({ navigateToEmail }: SocialButtonsProps) {
  console.log('SocialButtons')
  return (
    <View style={styles.container}>
      <PrimaryButton label="Continue with Email" onPress={navigateToEmail} />

      <GoogleButton onPress={navigateToEmail} />

      <AppleButton onPress={navigateToEmail} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
})
