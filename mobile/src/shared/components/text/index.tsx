import { useTheme } from '@/shared/context/ThemeContext'
import { Text, TextProps, TextStyle } from 'react-native'
import { Typography } from '../../theme/typography'

// Define the possible variants based on your theme's typography keys
export type TextVariant = keyof Typography

// Define props for the base component, extending React Native's TextProps
interface ThemedTextProps extends TextProps {
  children: React.ReactNode
  variant?: TextVariant
  style?: TextStyle
}

// Base ThemedText component
export const ThemedText = ({
  children,
  variant = 'body1',
  style,
  ...props
}: ThemedTextProps) => {
  const { theme } = useTheme()

  // Get the base style object for the specified variant from the theme
  // Fallback to body1 if the variant doesn't exist (defensive coding)
  const variantStyle = theme.typography[variant] || theme.typography.body1

  // Construct the final style object
  const textStyle: TextStyle = {
    // Base styles from the theme variant
    fontFamily: variantStyle.fontFamily,
    fontSize: variantStyle.fontSize,
    fontWeight: variantStyle.fontWeight as TextStyle['fontWeight'],
    lineHeight: variantStyle.lineHeight,
    // Default text color (can be overridden by the passed style prop)
    color: theme.colors.text.primary,
  }

  return (
    // Apply the base variant style first, then any overriding styles
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  )
}

// --- Semantic Aliases (Optional but Recommended) ---
// Keep these for easier usage and readability in your app code

// Props for aliases: Omit 'variant' as it's fixed, but keep other ThemedTextProps
type TextAliasProps = Omit<ThemedTextProps, 'variant'>

export const TextHeader = (props: TextAliasProps) => (
  <ThemedText variant="h1" {...props} />
)
export const TextHeaderTwo = (props: TextAliasProps) => (
  <ThemedText variant="h2" {...props} />
)
export const TextBody = (props: TextAliasProps) => (
  <ThemedText variant="body1" {...props} />
)
export const TextSubtitle = (props: TextAliasProps) => (
  <ThemedText variant="body2" {...props} />
)
export const TextButtonLabel = (props: TextAliasProps) => (
  <ThemedText variant="button" {...props} />
)
export const TextCaption = (props: TextAliasProps) => (
  <ThemedText variant="caption" {...props} />
)
