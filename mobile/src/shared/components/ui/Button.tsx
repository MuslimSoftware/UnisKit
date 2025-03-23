import React from 'react'
import {
  Pressable,
  StyleSheet,
  PressableProps,
  ViewStyle,
  StyleProp,
  PressableStateCallbackType,
} from 'react-native'
import { TextBody } from './typography'
import { useTheme } from '@/shared/hooks/theme'
import { Spacing } from '@/shared/constants/Spacing'

interface ButtonProps extends PressableProps {
  text: string
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  text,
  variant = 'primary',
  style,
  ...props
}) => {
  const theme = useTheme()

  const getStyles = (state: PressableStateCallbackType): ViewStyle => ({
    ...StyleSheet.flatten(styles.button),
    backgroundColor: variant === 'primary' ? theme.colors.tint : 'transparent',
    borderWidth: variant === 'secondary' ? 1 : 0,
    borderColor: theme.colors.border,
    opacity: state.pressed ? 0.7 : 1,
    ...(StyleSheet.flatten(style) as ViewStyle),
  })

  return (
    <Pressable style={getStyles} {...props}>
      <TextBody
        style={[
          styles.text,
          { color: variant === 'primary' ? '#fff' : theme.colors.text },
        ]}
      >
        {text}
      </TextBody>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.spacing.medium,
    paddingHorizontal: Spacing.spacing.large,
    borderRadius: Spacing.radius.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
})
