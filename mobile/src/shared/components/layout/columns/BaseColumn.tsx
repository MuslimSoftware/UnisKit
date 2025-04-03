import React from 'react'
import { View, ViewProps, StyleProp, ViewStyle, StyleSheet } from 'react-native'

export interface BaseColumnProps extends ViewProps {
  children: React.ReactNode
  gap: number // Explicit numeric gap is required
  style?: StyleProp<ViewStyle>
}

export const BaseColumn: React.FC<BaseColumnProps> = ({
  children,
  gap, // Use the provided gap directly
  style,
  ...props
}) => {
  // Combine the gap style with any passed styles
  const combinedStyle = StyleSheet.flatten([
    { gap: gap }, // Apply the vertical gap
    style, // Apply any additional styles passed via props
  ])

  return (
    <View style={combinedStyle} {...props}>
      {children}
    </View>
  )
}
