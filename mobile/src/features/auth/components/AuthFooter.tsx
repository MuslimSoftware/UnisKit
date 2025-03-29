import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { TextSubtitle, TextCaption } from '@/shared/components/text'

export function AuthFooter({
  navigateToEmail,
}: {
  navigateToEmail: () => void
}) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextSubtitle>Already have an account?</TextSubtitle>
        <TouchableOpacity onPress={navigateToEmail}>
          <TextSubtitle style={styles.link}>Sign in</TextSubtitle>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <TextCaption>By continuing, you agree to our</TextCaption>
        <TouchableOpacity>
          <TextCaption style={styles.link}>Terms of Service</TextCaption>
        </TouchableOpacity>
        <TextCaption> and</TextCaption>
        <TouchableOpacity>
          <TextCaption style={styles.link}>Privacy Policy</TextCaption>
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
