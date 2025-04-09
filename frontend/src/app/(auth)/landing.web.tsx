import React, { useState } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import {
  LOGO_SIZE,
  useLogoAnimation,
} from '@/features/auth/hooks/useLogoAnimation'
import {
  AnimatedLogo,
  INITIAL_POSITION,
} from '@/features/auth/components/AnimatedLogo'
import { Brand } from '@/features/shared/constants/Brand'
import { router } from 'expo-router'
import { useTheme } from '@/features/shared/context/ThemeContext'
import { TextHeader } from '../../features/shared/components/text'
import { BgView } from '../../features/shared/components/layout'
import { AuthInput } from '@/features/auth/components/AuthInput'
import { paddings } from '@/features/shared'

export default function LandingScreen() {
  const { theme } = useTheme()
  const { logoStyle, contentStyle } = useLogoAnimation()

  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigateToEmail = () => {
    router.push('/email')
  }

  console.log(Brand)
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

        <Animated.View
          style={[
            styles.bottomContent,
            contentStyle,
          ]}
        >
          <AuthInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            error={!!errorMessage}
            errorMessage={errorMessage}
          />
        </Animated.View>
      </Animated.View>

      {/* Bottom Content */}

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
  titleContainer: {
    width: '50%',
  },
  bottomContent: {
    marginTop: paddings.large,
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    textAlign: 'center',
  },
})
