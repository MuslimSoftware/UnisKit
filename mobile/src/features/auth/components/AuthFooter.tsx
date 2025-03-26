import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { TextSM } from '@/shared/components/ui/text'
import { useTheme } from '@/shared/hooks/useTheme'
import { Theme } from '@/shared/types/theme'
export function AuthFooter({
  navigateToEmail,
}: {
  navigateToEmail: () => void
}) {
  const {theme} = useTheme()

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextSM>Already have an account?</TextSM>
        <TouchableOpacity onPress={navigateToEmail}>
          <TextSM style={[styles.link, { color: theme.colors.actionPrimary }]}>
            Sign in
          </TextSM>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <TextSM>By continuing, you agree to our </TextSM>
        <TouchableOpacity>
          <TextSM style={[styles.link, { color: theme.colors.actionPrimary }]}>
            Terms of Service
          </TextSM>
        </TouchableOpacity>
        <TextSM> and </TextSM>
        <TouchableOpacity>
          <TextSM style={[styles.link, { color: theme.colors.actionPrimary }]}>
            Privacy Policy
          </TextSM>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xlarge,
    paddingBottom: theme.layout.screen,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xxsmall,
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
    fontWeight: theme.typography.weights.medium,
  },
})
