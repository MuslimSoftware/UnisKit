import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { useLogoAnimation } from '@/hooks/animation'
import { TextBody, TextTitle } from '@/components/typography'
import { Spacing } from '@/constants/Spacing'
import { useLogin } from '@/hooks/auth/useLogin'
import { SocialButtons } from '@/components/auth/SocialButtons'
import { AuthFooter } from '@/components/auth/AuthFooter'
import { AnimatedLogo, INITIAL_POSITION } from '@/components/auth/AnimatedLogo'
import { Brand } from '@/constants/Brand'

const LOGO_SIZE = 160 // The size of the logo

export default function LandingScreen() {
  const { logoStyle, contentStyle } = useLogoAnimation()
  const { handleEmailSignup, handleEmailLogin, socialButtons } = useLogin()

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

        <SocialButtons
          onEmailSignup={handleEmailSignup}
          googleStyles={socialButtons.google}
          appleStyles={socialButtons.apple}
        />

        <AuthFooter onEmailLogin={handleEmailLogin} />
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
    paddingHorizontal: Spacing.padding.screen,
    paddingBottom: Spacing.margin.lg,
    justifyContent: 'flex-end',
    gap: Spacing.margin.xl,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
})
