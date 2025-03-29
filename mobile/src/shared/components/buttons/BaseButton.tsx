import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
} from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface BaseButtonProps
  extends Omit<TouchableOpacityProps, 'children'> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export const BaseButton = ({
  children,
  variant = 'primary',
  disabled = false,
  style,
  ...props
}: BaseButtonProps) => {
  const { theme } = useTheme()

  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    {
      backgroundColor: (disabled
        ? theme.colors.text.disabled
        : theme.colors.button[variant].background) as ColorValue,
      borderColor: (disabled
        ? theme.colors.text.disabled
        : theme.colors.button[variant].border) as ColorValue,
      padding: theme.spacing.button.padding,
      borderRadius: theme.spacing.button.borderRadius,
    },
    style,
  ]

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
})
