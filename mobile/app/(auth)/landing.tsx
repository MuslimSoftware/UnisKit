import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { ThemedView } from '@/shared/components/ui/ThemedView'
import {
  LOGO_SIZE,
  useLogoAnimation,
} from '@/features/animation/hooks/useLogoAnimation'
import { TextBody, TextTitle } from '@/shared/components/ui'
import { Spacing } from '@/constants/Spacing'
import { SocialButtons } from '@/features/auth/components/SocialButtons'
import { AuthFooter } from '@/features/auth/components/AuthFooter'
import {
  AnimatedLogo,
  INITIAL_POSITION,
} from '@/features/auth/components/AnimatedLogo'
import { Brand } from '@/constants/Brand'
import { router } from 'expo-router'

export default function LandingScreen() {
  const { logoStyle, contentStyle } = useLogoAnimation()

  const navigateToEmail = () => {
    router.push('/email')
  }

  return (
    <ThemedView style={styles.container}>
      {/* Logo and Brand Name Group */}
      <Animated.View style={[styles.logoGroup, logoStyle]}>
        <View style={styles.logoWrapper}>
          <AnimatedLogo />
        </View>
        <Animated.View style={[styles.titleContainer, contentStyle]}>
          <TextTitle style={styles.title}>{Brand.name}</TextTitle>
        </Animated.View>
      </Animated.View>

      {/* Bottom Content */}
      <Animated.View style={[styles.bottomContent, contentStyle]}>
        <TextBody variant="secondary" style={styles.subtitle}>
          Choose how you'd like to continue
        </TextBody>

        <SocialButtons navigateToEmail={navigateToEmail} />

        <AuthFooter navigateToEmail={navigateToEmail} />
      </Animated.View>
    </ThemedView>
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
    paddingHorizontal: Spacing.layout.screen,
    paddingBottom: Spacing.spacing.large,
    justifyContent: 'flex-end',
    gap: Spacing.spacing.xlarge,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
})
