import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { LOGO_SIZE, useLogoAnimation } from '@/hooks/animation'
import { TextBody, TextTitle } from '@/components/typography'
import { Spacing } from '@/constants/Spacing'
import { SocialButtons } from '@/components/auth/SocialButtons'
import { AuthFooter } from '@/components/auth/AuthFooter'
import { AnimatedLogo, INITIAL_POSITION } from '@/components/auth/AnimatedLogo'
import { Brand } from '@/constants/Brand'
import { useLandingPage } from '@/hooks/auth/useLandingPage'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/hooks/theme'
export default function LandingScreen() {
  const { logoStyle, contentStyle } = useLogoAnimation()

  const theme = useTheme()
  const { handleEmailSignup, handleEmailLogin } = useLandingPage()

  const socialButtonStyles = {
    google: {
      background: Colors.white,
      text: Colors.black,
      icon: Colors.black,
      border: theme.colors.border,
    },
    apple: {
      background: theme.isDark ? Colors.white : Colors.black,
      text: theme.isDark ? Colors.black : Colors.white,
      icon: theme.isDark ? Colors.black : Colors.white,
    },
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

        <SocialButtons
          onEmailSignup={handleEmailSignup}
          googleStyles={socialButtonStyles.google}
          appleStyles={socialButtonStyles.apple}
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
