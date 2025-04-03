import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { PrimaryButton } from '@/shared/components/buttons'
import { TextHeader, TextBody } from '@/shared/components/text'
import { BgView, MediumColumn } from '@/shared/components/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { paddings } from '@fullstack-template/shared'
import { useTheme } from '@/shared/context/ThemeContext'
import { Href } from 'expo-router'

export default function NotFoundScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()

  const handleGoHome = () => {
    router.dismissAll()
    router.replace('/' as Href)
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <BgView style={{
        ...styles.container, 
        paddingTop: insets.top, 
        paddingBottom: insets.bottom
      }}>
        <MediumColumn style={styles.content}>
          <TextHeader style={styles.title}>Oops!</TextHeader>
          <TextBody style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            We couldn't find the page you were looking for.
          </TextBody>
          <PrimaryButton 
            onPress={handleGoHome}
            label="Go to Home Screen"
            style={styles.button}
          />
        </MediumColumn>
      </BgView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: paddings.large,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    marginBottom: paddings.medium,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: paddings.large,
  },
  button: {
    width: '100%',
    maxWidth: 300,
  },
})
