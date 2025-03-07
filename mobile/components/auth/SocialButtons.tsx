import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button } from '@/components/Button'
import { Spacing } from '@/constants/Spacing'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/hooks/theme'

interface SocialButtonsProps {
  navigateToEmail: () => void
}

export function SocialButtons({ navigateToEmail }: SocialButtonsProps) {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <Button
        icon="mail-outline"
        text="Continue with Email"
        onPress={navigateToEmail}
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
        onPress={navigateToEmail}
        align="left"
        backgroundColor={Colors.white}
        borderColor={theme.colors.border}
        textColor={Colors.black}
      />

      <Button
        icon="logo-apple"
        text="Continue with Apple"
        onPress={navigateToEmail}
        align="left"
        backgroundColor={theme.isDark ? Colors.white : Colors.black}
        textColor={theme.isDark ? Colors.black : Colors.white}
        iconColor={theme.isDark ? Colors.black : Colors.white}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.spacing.medium,
  },
})
