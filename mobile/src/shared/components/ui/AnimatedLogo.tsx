import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Header1 } from './typography'
import { Brand } from '@/shared/constants/Brand'

interface AnimatedLogoProps {
  animatedStyle?: any
  showTitle?: boolean
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  animatedStyle,
  showTitle = true,
}) => {
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.logo} />
      {showTitle && <Header1 style={styles.title}>{Brand.name}</Header1>}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#2f95dc',
    borderRadius: 20,
  },
  title: {
    marginTop: 16,
  },
})
