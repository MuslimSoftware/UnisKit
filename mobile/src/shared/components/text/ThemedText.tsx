import React from 'react'
import { useTheme } from '@/shared/context/ThemeContext'
import { Text, TextProps, TextStyle, StyleProp } from 'react-native'
import { Typography } from '../../theme/typography'

// Define the possible variants based on your theme's typography keys
export type TextVariant = keyof Typography

// Define props for the base component, extending React Native's TextProps
export interface ThemedTextProps extends TextProps {
  children: React.ReactNode
  variant?: TextVariant
  style?: StyleProp<TextStyle>
  color?: string
}

// Base ThemedText component
export const ThemedText = ({
  children,
  variant = 'body1',
  style,
  color,
  ...props
}: ThemedTextProps) => {
  const { theme } = useTheme()

  const variantStyle = theme.typography[variant] || theme.typography.body1

  const textStyle: TextStyle = {
    fontFamily: variantStyle.fontFamily,
    fontSize: variantStyle.fontSize,
    fontWeight: variantStyle.fontWeight as TextStyle['fontWeight'],
    lineHeight: variantStyle.lineHeight,
    color: color || theme.colors.text.primary,
  }

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  )
}

// Props for aliases: Omit 'variant' as it's fixed, but keep other ThemedTextProps
export type TextAliasProps = Omit<ThemedTextProps, 'variant'>
