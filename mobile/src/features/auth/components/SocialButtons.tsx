import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from '@/shared/components/buttons'

interface SocialButtonsProps {
  navigateToEmail: () => void
}

export function SocialButtons({ navigateToEmail }: SocialButtonsProps) {
  console.log('SocialButtons')
  return (
    <View style={styles.container}>
      <PrimaryButton label="Continue with Email" onPress={navigateToEmail} />

      <SecondaryButton label="Continue with Google" onPress={navigateToEmail} />

      <PrimaryButton label="Continue with Apple" onPress={navigateToEmail} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
})
