import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { TextSmall } from '@/shared/components/ui/typography'
import { useTheme } from '@/shared/hooks/theme'
import { Spacing } from '@/shared/constants/Spacing'
import { Typography } from '@/shared/constants/Typography'

export function AuthFooter({
  navigateToEmail,
}: {
  navigateToEmail: () => void
}) {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextSmall variant="secondary">Already have an account?</TextSmall>
        <TouchableOpacity onPress={navigateToEmail}>
          <TextSmall style={[styles.link, { color: theme.colors.tint }]}>
            Sign in
          </TextSmall>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <TextSmall variant="secondary">
          By continuing, you agree to our{' '}
        </TextSmall>
        <TouchableOpacity>
          <TextSmall style={[styles.link, { color: theme.colors.tint }]}>
            Terms of Service
          </TextSmall>
        </TouchableOpacity>
        <TextSmall variant="secondary"> and </TextSmall>
        <TouchableOpacity>
          <TextSmall style={[styles.link, { color: theme.colors.tint }]}>
            Privacy Policy
          </TextSmall>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.spacing.xlarge,
    paddingBottom: Spacing.layout.screen,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.spacing.xxsmall,
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: Typography.weights.medium,
  },
})
