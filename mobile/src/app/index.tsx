import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useFonts } from 'expo-font'
import { useSplashAnimation } from '@/features/auth/hooks/useSplashAnimation'
import { AnimatedLogo } from '@/features/auth/components/AnimatedLogo'

export default function SplashScreen() {
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  })

  const fontsLoadedPromise = new Promise<void>((resolve) => {
    if (loaded) {
      resolve()
    }
  })

  const { animatedStyle } = useSplashAnimation(fontsLoadedPromise)

  return (
    <View style={styles.container}>
      <AnimatedLogo animatedStyle={animatedStyle} showTitle={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
