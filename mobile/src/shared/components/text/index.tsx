import { useTheme } from '@/shared/context/ThemeContext'
import { Text, TextStyle } from 'react-native'

export const TextHeader = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: TextStyle
}) => {
  const { theme } = useTheme()

  const textStyle = {
    color: theme.colors.text.primary,
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    lineHeight: theme.typography.h1.lineHeight,
  }

  return <Text style={[textStyle, style]}>{children}</Text>
}

export const TextBody = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: TextStyle
}) => {
  const { theme } = useTheme()

  const textStyle = {
    color: theme.colors.text.primary,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
    lineHeight: theme.typography.body1.lineHeight,
  }

  return <Text style={[textStyle, style]}>{children}</Text>
}
