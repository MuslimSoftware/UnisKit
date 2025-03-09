import { useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'
import { INITIAL_POSITION, FINAL_POSITION } from '@/components/auth/AnimatedLogo'

export const LOGO_SIZE = 160 // The size of the logo
const SCREEN_HEIGHT = Dimensions.get('window').height

export function useLogoAnimation() {
  const translateYAnim = new Animated.Value(0)
  const contentOpacityAnim = new Animated.Value(0)

  useEffect(() => {
    // Add a small delay before starting the animation
    setTimeout(() => {
      Animated.parallel([
        // Move the logo up
        Animated.spring(translateYAnim, {
          toValue: -(SCREEN_HEIGHT * (INITIAL_POSITION - FINAL_POSITION)),
          tension: 12.5,
          friction: 10,
          useNativeDriver: true,
        }),
        // Fade in the content slightly delayed but during logo movement
        Animated.sequence([
          Animated.delay(500), // Small delay before content starts appearing
          Animated.timing(contentOpacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start()
    }, 100)
  }, [])

  return {
    logoStyle: {
      transform: [{ translateY: translateYAnim }],
    },
    contentStyle: {
      opacity: contentOpacityAnim,
    }
  }
} 