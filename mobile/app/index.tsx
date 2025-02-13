import React from 'react'
import { StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
import { ThemedView } from '@/components/ThemedView'
import { useSplashAnimation } from '@/hooks/animation/useSplashAnimation'
import { AnimatedLogo } from '@/components/auth/AnimatedLogo'

export default function SplashScreen() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  const fontsLoadedPromise = new Promise<void>((resolve) => {
    if (loaded) {
      resolve()
    }
  })

  const { animatedStyle } = useSplashAnimation(fontsLoadedPromise)

  return (
    <ThemedView style={styles.container}>
      <AnimatedLogo animatedStyle={animatedStyle} showTitle={false} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
