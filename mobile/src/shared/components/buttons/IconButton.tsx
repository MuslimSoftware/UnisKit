import React from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface IconButtonProps {
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success'
    | 'default'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onPress?: () => void
  style?: ViewStyle
  children: React.ReactNode
}

export const IconButton: React.FC<IconButtonProps> = ({
  color = 'default',
  size = 'medium',
  disabled = false,
  onPress,
  style,
  children,
}) => {
  const { theme } = useTheme()

  const getColor = () => {
    if (disabled) return theme.palette.text.disabled
    if (color === 'default') return theme.palette.text.primary
    return theme.palette[color].main
  }

  const getSize = () => {
    switch (size) {
      case 'small':
        return 32
      case 'large':
        return 48
      default:
        return 40
    }
  }

  const buttonSize = getSize()

  const buttonStyles = StyleSheet.create({
    button: {
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
      ...style,
    },
    ripple: {
      color: getColor(),
    },
  })

  return (
    <TouchableOpacity
      style={buttonStyles.button}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  )
}

export default IconButton
