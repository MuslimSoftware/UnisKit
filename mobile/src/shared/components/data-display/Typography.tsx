import React from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'overline'
  color?:
    | 'initial'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success'
    | 'textPrimary'
    | 'textSecondary'
  align?: 'left' | 'center' | 'right'
  style?: TextStyle
  children: React.ReactNode
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'initial',
  align = 'left',
  style,
  children,
}) => {
  const { theme } = useTheme()

  const getColor = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main
      case 'secondary':
        return theme.palette.secondary.main
      case 'error':
        return theme.palette.error.main
      case 'warning':
        return theme.palette.warning.main
      case 'info':
        return theme.palette.info.main
      case 'success':
        return theme.palette.success.main
      case 'textPrimary':
        return theme.palette.text.primary
      case 'textSecondary':
        return theme.palette.text.secondary
      default:
        return undefined // Use the default color from the typography variant
    }
  }

  const styles = StyleSheet.create({
    text: {
      ...theme.typography[variant],
      color:
        getColor() ||
        theme.typography[variant].color ||
        theme.palette.text.primary,
      textAlign: align,
      ...style,
    },
  })

  return <Text style={styles.text}>{children}</Text>
}

export default Typography
