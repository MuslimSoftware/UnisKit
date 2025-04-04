import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import {
  LOGO_SIZE,
  useLogoAnimation,
} from '@/features/auth/hooks/useLogoAnimation'
import { SocialButtons } from '@/features/auth/components/SocialButtons'
import { AuthFooter } from '@/features/auth/components/AuthFooter'
import {
  AnimatedLogo,
  INITIAL_POSITION,
} from '@/features/auth/components/AnimatedLogo'
import { Brand } from '@uniskit/shared'
import { router } from 'expo-router'
import { useTheme } from '@/shared/context/ThemeContext'
import { TextBody, TextHeader } from '@/shared/components/text'
import { BgView } from '@/shared/components/layout'

export default function LandingScreen() {
  const { theme } = useTheme()
  const { logoStyle, contentStyle } = useLogoAnimation()

  const navigateToEmail = () => {
    router.push('/email')
  }

  return (
    <BgView style={styles.container}>
      {/* Logo and Brand Name Group */}
      <Animated.View style={[styles.logoGroup, logoStyle]}>
        <View style={styles.logoWrapper}>
          <AnimatedLogo />
        </View>
        <Animated.View style={[styles.titleContainer, contentStyle]}>
          <TextHeader style={styles.title}>{Brand.name}</TextHeader>
        </Animated.View>
      </Animated.View>

      {/* Bottom Content */}
      <Animated.View
        style={[
          styles.bottomContent,
          contentStyle,
          {
            gap: theme.spacing.section.gap,
            paddingHorizontal: theme.spacing.section.padding,
            paddingBottom: theme.spacing.section.padding,
          },
        ]}
      >
        <TextBody style={styles.subtitle}>
          Choose how you'd like to continue
        </TextBody>

        <SocialButtons navigateToEmail={navigateToEmail} />

        <AuthFooter navigateToEmail={navigateToEmail} />
      </Animated.View>
    </BgView>
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
