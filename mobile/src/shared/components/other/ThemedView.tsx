import React from 'react'
import { View, ViewProps } from 'react-native'
import { useTheme } from '@/shared/hooks'

export const ThemedView: React.FC<ViewProps> = ({ style, ...props }) => {
  const theme = useTheme()
  return (
    <View
      style={[{ backgroundColor: theme.colors.background }, style]}
      {...props}
    />
  )
}
