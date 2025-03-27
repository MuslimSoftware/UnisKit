import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native'
import { TextBody } from '../text'
import { useTheme } from '@/shared/context/ThemeContext'

export interface BaseButtonProps extends TouchableOpacityProps {
  label: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export const BaseButton = ({
  label,
  variant = 'primary',
  disabled = false,
  style,
  ...props
}: BaseButtonProps) => {
  const { theme } = useTheme()

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: disabled
        ? theme.colors.text.disabled
        : theme.colors.button[variant],
      padding: theme.spacing.button.padding,
      borderRadius: 8,
    },
    style,
  ]

  return (
    <TouchableOpacity style={buttonStyle} disabled={disabled} {...props}>
      <TextBody style={{ color: theme.colors.text.primary }}>{label}</TextBody>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const PrimaryButton = ({ label, ...props }: BaseButtonProps) => {
  return <BaseButton label={label} variant="primary" {...props} />
}

export const SecondaryButton = ({ label, ...props }: BaseButtonProps) => {
  return <BaseButton label={label} variant="secondary" {...props} />
}
