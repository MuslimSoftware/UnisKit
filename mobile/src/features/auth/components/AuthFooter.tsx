import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Typography } from '@/shared/components/data-display/Typography'
import { useTheme } from '@/shared/context/ThemeContext'
export function AuthFooter({
  navigateToEmail,
}: {
  navigateToEmail: () => void
}) {
  const { theme } = useTheme()

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Typography variant="body2">Already have an account?</Typography>
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
