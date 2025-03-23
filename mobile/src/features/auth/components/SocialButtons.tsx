import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button } from '@/shared/components/ui/Button'
import { Spacing } from '@/shared/constants/Spacing'

interface SocialButtonsProps {
  navigateToEmail: () => void
}

export function SocialButtons({ navigateToEmail }: SocialButtonsProps) {
  return (
    <View style={styles.container}>
      <Button
        icon="mail-outline"
        text="Continue with Email"
        onPress={navigateToEmail}
        variant="secondary"
      />

      <Button
        icon={
          <Image
            source={require('@/assets/images/google.png')}
            style={{ width: 24, height: 24 }}
          />
        }
        text="Continue with Google"
        onPress={navigateToEmail}
        variant="secondary"
      />

      <Button
        icon="logo-apple"
        text="Continue with Apple"
        onPress={navigateToEmail}
        variant="secondary"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.spacing.medium,
  },
})
