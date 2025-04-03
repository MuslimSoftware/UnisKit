import React from 'react'
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native'
import { paddings } from '@fullstack-template/shared'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BgView } from './BgView'

// Extend ViewProps to accept standard View properties
interface PageViewProps extends ViewProps {
  children: React.ReactNode
  style?: ViewStyle // Allow overriding or extending styles
}

export const PageView = ({ children, style, ...props }: PageViewProps) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // Apply horizontal padding using the value from theme spacing
    paddingHorizontal: paddings.medium,
    // Make it flexible by default to take up available space within its parent
    flex: 1,
  },
})
