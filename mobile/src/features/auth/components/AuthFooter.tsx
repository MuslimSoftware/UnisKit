import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import { TextBody } from '@/shared/components/text'

export function AuthFooter({
  navigateToEmail,
}: {
  navigateToEmail: () => void
}) {
  const { theme } = useTheme()

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextBody>Already have an account?</TextBody>
        <TouchableOpacity onPress={navigateToEmail}>
          {/* <Typography variant="body2" style={[styles.link, { color: theme.palette.primary.main }]}>
            Sign in
          </Typography>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <Typography variant="body2">By continuing, you agree to our </Typography>
        <TouchableOpacity>
          <Typography variant="body2" style={[styles.link, { color: theme.palette.primary.main }]}>
            Terms of Service
          </Typography>
        </TouchableOpacity>
        <Typography variant="body2"> and </Typography>
        <TouchableOpacity>
          <Typography variant="body2" style={[styles.link, { color: theme.palette.primary.main }]}>
            Privacy Policy
          </Typography> */}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
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
    fontWeight: 'bold',
  },
})
