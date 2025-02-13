import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TextBody } from './typography'
import { useTheme } from '@/hooks/theme'
import { Spacing } from '@/constants/Spacing'
import { Colors } from '@/constants/Colors'

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary'
  icon?: React.ReactNode | keyof typeof Ionicons.glyphMap
  text: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  align?: 'left' | 'center'
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  iconColor?: string
}

export function Button({
  variant = 'primary',
  icon,
  text,
  style,
  disabled,
  align = 'center',
  backgroundColor,
  borderColor,
  textColor,
  iconColor,
  ...props
}: ButtonProps) {
  const theme = useTheme()

  const getButtonStyle = () => {
    const baseStyle = {
      backgroundColor: backgroundColor || theme.button[variant].background,
      ...(borderColor && { borderWidth: 1, borderColor }),
    }

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: theme.isDark ? Colors.gray600 : Colors.gray300,
        opacity: theme.isDark ? 0.7 : 1,
      }
    }

    return baseStyle
  }

  const renderIcon = () => {
    if (!icon) return null

    if (React.isValidElement(icon)) {
      return icon
    }

    return (
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={24}
        color={iconColor || theme.button[variant].icon}
      />
    )
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        align === 'left' && styles.buttonLeft,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <View style={[styles.content, align === 'left' && styles.contentLeft]}>
        {renderIcon()}
        <TextBody
          style={[
            styles.text,
            { color: textColor || theme.button[variant].text },
          ]}
        >
          {text}
        </TextBody>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: Spacing.padding.button,
    borderRadius: Spacing.borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLeft: {
    alignItems: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.gap.sm,
  },
  contentLeft: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
  },
})
