import React from 'react'
import { StyleSheet, TextStyle, View } from 'react-native'
import { BaseButton, BaseButtonProps } from './BaseButton'
import { ThemedText, TextVariant } from '../text' // Use ThemedText for flexibility
import { useTheme } from '@/shared/context/ThemeContext'

// Extend BaseButtonProps, adding icon and specific text props
export interface IconButtonProps extends Omit<BaseButtonProps, 'children'> {
  label: string
  icon?: React.ReactNode // Icon component (e.g., from vector-icons)
  iconPosition?: 'left' | 'right' // Optional: Where to place the icon
  textVariant?: TextVariant // Optional: Control text style
  textColor?: string // Optional: Override default text color
  textStyle?: TextStyle // Optional: Further text style overrides
}

export const IconButton = ({
  label,
  icon,
  iconPosition = 'left',
  variant = 'primary', // Default variant passed to BaseButton
  textVariant = 'button', // Default text style
  textColor,
  textStyle,
  style,
  ...props
}: IconButtonProps) => {
  const { theme } = useTheme()

  // Determine default text color from theme based on variant
  // Fallback to theme.colors.text.primary if button-specific text color isn't defined
  const defaultTextColorFromTheme =
    theme.colors.button[variant]?.text || theme.colors.text.primary

  // Determine final text color: explicit prop > theme button text > theme primary text
  const finalTextColor = textColor || defaultTextColorFromTheme

  const textElement = (
    <ThemedText
      variant={textVariant}
      style={{ color: finalTextColor, ...textStyle }}
    >
      {label}
    </ThemedText>
  )

  const content = (
    <>
      {iconPosition === 'left' && icon}
      {textElement}
      {iconPosition === 'right' && icon}
    </>
  )

  return (
    <BaseButton variant={variant} style={style} {...props}>
      {content}
    </BaseButton>
  )
}

// IconButton doesn't need its own StyleSheet for now
