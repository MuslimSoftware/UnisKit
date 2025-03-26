import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import Box from '@/shared/components/layout/Box'
import {
  LOGO_SIZE,
  useLogoAnimation,
} from '@/features/auth/hooks/useLogoAnimation'
import { Typography } from '@/shared/components/data-display/Typography'
import { SocialButtons } from '@/features/auth/components/SocialButtons'
import { AuthFooter } from '@/features/auth/components/AuthFooter'
import { useThemeSpacing } from '@/shared/hooks/useThemeSpacing'
import {
  AnimatedLogo,
  INITIAL_POSITION,
} from '@/features/auth/components/AnimatedLogo'
import { Brand } from '@/shared/constants/Brand'
import { router } from 'expo-router'

export default function LandingScreen() {
  const { logoStyle, contentStyle } = useLogoAnimation()
  const getSpacing = useThemeSpacing()
  const navigateToEmail = () => {
    router.push('/email')
  }

  return (
    <Box style={styles.container}>
      {/* Logo and Brand Name Group */}
      <Animated.View style={[styles.logoGroup, logoStyle]}>
        <View style={styles.logoWrapper}>
          <AnimatedLogo />
        </View>
        <Animated.View style={[styles.titleContainer, contentStyle]}>
          <Typography variant="h6" style={styles.title}>
            {Brand.name}
          </Typography>
        </Animated.View>
      </Animated.View>

      {/* Bottom Content */}
      <Animated.View
        style={[
          styles.bottomContent,
          contentStyle,
          {
            gap: getSpacing(4),
            paddingHorizontal: getSpacing(4),
            paddingBottom: getSpacing(4),
          },
        ]}
      >
        <Typography variant="subtitle2" style={styles.subtitle}>
          Choose how you'd like to continue
        </Typography>

        <SocialButtons navigateToEmail={navigateToEmail} />

        <AuthFooter navigateToEmail={navigateToEmail} />
      </Animated.View>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoGroup: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: `${INITIAL_POSITION * 100}%`,
    alignItems: 'center',
  },
  logoWrapper: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {},
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
})
