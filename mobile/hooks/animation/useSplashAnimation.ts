import { useEffect } from 'react'
import { Animated } from 'react-native'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
export function useSplashAnimation(onFontsLoaded: Promise<void>) {
  const scaleAnim = new Animated.Value(0.3)
  const opacityAnim = new Animated.Value(0)
  const breatheAnim = new Animated.Value(1)

  useEffect(() => {
    // Create breathing animation
    const createBreathingAnimation = () => {
      return Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    }

    // Initial fade in and scale up
    const initialAnimation = Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ])

    let breathingLoop: Animated.CompositeAnimation | null = null

    // Start breathing animation loop
    const startBreathing = () => {
      breathingLoop = Animated.loop(createBreathingAnimation(), {
        iterations: -1,
      })
      breathingLoop.start()
    }

    // Start the animation sequence
    initialAnimation.start(() => {
      startBreathing()
      
      // Wait for fonts to load
      onFontsLoaded.then(() => {
        // Simulate API calls with a 2-second delay
        setTimeout(() => {
          // Complete current breathing cycle
          if (breathingLoop) {
            breathingLoop.stop()
          }
          
          // Do one final complete breath before transitioning
          createBreathingAnimation().start(async () => {
            // Login if user is already logged in
            const refreshToken = await SecureStore.getItemAsync('refresh_token')
            if (refreshToken) {
              router.replace('/(tabs)')
            } else {
              router.replace('/(auth)/landing')
            }
          })
        }, 100)
      })
    })

    return () => {
      if (breathingLoop) {
        breathingLoop.stop()
      }
    }
  }, [])

  return {
    animatedStyle: {
      opacity: opacityAnim,
      transform: [
        { scale: Animated.multiply(scaleAnim, breatheAnim) }
      ],
    },
  }
} 