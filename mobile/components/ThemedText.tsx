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
  fontSize = Typography.sizes.body,
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

const styles = StyleSheet.create({
  default: {
    fontSize: Typography.sizes.body,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: Typography.sizes.body,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: Typography.sizes.title,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: Typography.sizes.subtitle,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: Typography.sizes.body,
    color: '#0a7ea4',
  },
})
