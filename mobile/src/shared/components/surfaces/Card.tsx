import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface CardProps {
  elevation?: number
  style?: ViewStyle
  contentStyle?: ViewStyle
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  elevation = 1,
  style,
  contentStyle,
  children,
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation },
      shadowOpacity: 0.1 + elevation * 0.05,
      shadowRadius: elevation,
      elevation: elevation,
      ...style,
    },
    content: {
      padding: theme.spacing(2),
      ...contentStyle,
    },
  })

  return (
    <View style={styles.card}>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

export default Card
