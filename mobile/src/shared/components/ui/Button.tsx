import React from 'react'
import {
  Pressable,
  StyleSheet,
  PressableProps,
  ViewStyle,
  StyleProp,
  PressableStateCallbackType,
} from 'react-native'
import { Button as ButtonText } from './typography'
import { useTheme } from '../../hooks/useTheme'

interface ButtonProps extends PressableProps {
  text: string
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  text,
  variant = 'primary',
  size = 'md',
  style,
  ...props
}) => {
  const theme = useTheme()

  const getStyles = (state: PressableStateCallbackType): ViewStyle => ({
    ...StyleSheet.flatten(styles.button),
    backgroundColor:
      variant === 'primary' ? theme.colors.primary : 'transparent',
    borderWidth: variant === 'secondary' ? 1 : 0,
    borderColor: theme.colors.primary,
    opacity: state.pressed ? 0.7 : 1,
    padding: theme.spacing[size],
    borderRadius: theme.borderRadius.md,
    ...(StyleSheet.flatten(style) as ViewStyle),
  })

  return (
    <Pressable style={getStyles} {...props}>
      {icon}
      <ButtonText
        color={
          variant === 'primary' ? theme.colors.white : theme.colors.primary
        }
        align="center"
      >
        {text}
      </ButtonText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
})
