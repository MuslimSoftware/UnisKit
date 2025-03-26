import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button } from '@/shared/components/buttons/Button'
import { useThemeSpacing } from '@/shared/hooks/useThemeSpacing'

interface SocialButtonsProps {
  navigateToEmail: () => void
}

export function SocialButtons({ navigateToEmail }: SocialButtonsProps) {
  return (
    <View style={styles.container}>
      <Button
        children="Continue with Email"
        onPress={navigateToEmail}
        variant="contained"
      />

      <Button
        children="Continue with Google"
        onPress={navigateToEmail}
        variant="contained"
      />

      <Button
        children="Continue with Apple"
        onPress={navigateToEmail}
        variant="contained"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
})
