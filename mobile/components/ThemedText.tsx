import { Text, TextProps, StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/theme'
import { Typography } from '@/constants/Typography'

export interface ThemedTextProps extends TextProps {
  inverted?: boolean
  variant?: 'primary' | 'secondary'
  backgroundColor?: string
  fontSize?: number
}

export function ThemedText({
  style,
  inverted,
  variant = 'primary',
  backgroundColor,
  fontSize = Typography.sizes.medium,
  ...props
}: ThemedTextProps) {
  const theme = useTheme()

  const getTextColor = () => {
    if (inverted) return '#FFFFFF'

    if (backgroundColor) {
      return theme.getContrastText(backgroundColor)
    }

    if (variant === 'secondary') {
      return theme.isDark ? '#999999' : '#666666'
    }

    return theme.isDark ? '#FFFFFF' : '#000000'
  }

  return (
    <Text
      style={[
        {
          color: getTextColor(),
          fontSize,
        },
        style,
      ]}
      {...props}
    />
  )
}
