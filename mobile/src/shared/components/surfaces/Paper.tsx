import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface PaperProps {
  elevation?: number
  square?: boolean
  variant?: 'elevation' | 'outlined'
  style?: ViewStyle
  children: React.ReactNode
}

export const Paper: React.FC<PaperProps> = ({
  elevation = 1,
  square = false,
  variant = 'elevation',
  style,
  children,
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: square ? 0 : theme.shape.borderRadius,
      ...(variant === 'outlined'
        ? {
            borderWidth: 1,
            borderColor: theme.palette.divider,
          }
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: elevation },
            shadowOpacity: 0.1 + elevation * 0.05,
            shadowRadius: elevation,
            elevation: elevation,
          }),
      ...style,
    },
  })

  return <View style={styles.paper}>{children}</View>
}

export default Paper
