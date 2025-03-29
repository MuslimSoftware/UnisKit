import React from 'react'
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native'
import { spacing } from '@/shared/theme/spacing'

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
    paddingHorizontal: spacing.section.padding,
    // Make it flexible by default to take up available space within its parent
    flex: 1,
  },
})
