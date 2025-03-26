import React from 'react'
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  StyleProp,
} from 'react-native'
import { useTheme } from '@/shared/hooks/useTheme'
import { ThemeProps, Typography, SpacingProps } from '@/shared/types/theme'
import { useFontScale } from '@/shared/hooks/useFontScale'

export interface TextProps extends RNTextProps, ThemeProps {
  // Additional props for our custom Text component
  children?: React.ReactNode
  adjustsFontSizeToFit?: boolean
  numberOfLines?: number
  selectable?: boolean
}

// Helper type for safely accessing typography categories
type TypographyCategory = keyof Typography
type TextSize = 'xs' | 'sm' | 'base' | 'lg'
// Valid font weights in React Native
type FontWeight =
  | '400'
  | '500'
  | '600'
  | '700'
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '800'
  | '900'
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | undefined

// Process spacing from theme - only using base spacing values, not nested objects
const getSpacingStyle = (
  props: SpacingProps,
  themeSpacing: any
): StyleProp<TextStyle> => {
  if (!props) return {}

  const style: Record<string, number> = {}
  const spacingProps: Array<[keyof SpacingProps, string]> = [
    ['m', 'margin'],
    ['mt', 'marginTop'],
    ['mr', 'marginRight'],
    ['mb', 'marginBottom'],
    ['ml', 'marginLeft'],
    ['mx', 'marginHorizontal'],
    ['my', 'marginVertical'],
    ['p', 'padding'],
    ['pt', 'paddingTop'],
    ['pr', 'paddingRight'],
    ['pb', 'paddingBottom'],
    ['pl', 'paddingLeft'],
    ['px', 'paddingHorizontal'],
    ['py', 'paddingVertical'],
  ]

  spacingProps.forEach(([prop, styleProp]) => {
    const value = props[prop]
    if (value !== undefined) {
      if (typeof value === 'string') {
        // Only use primitive spacing values, not nested objects
        if (typeof themeSpacing[value] === 'number') {
          style[styleProp] = themeSpacing[value]
        }
      } else if (typeof value === 'number') {
        style[styleProp] = value
      }
    }
  })

  return style
}

export const Text = React.forwardRef<RNText, TextProps>((props, ref) => {
  const {
    children,
    style,
    variant = 'text.base',
    color: colorProp,
    fontSize: fontSizeProp,
    fontWeight: fontWeightProp,
    lineHeight: lineHeightProp,
    // Extract spacing props
    m,
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
    p,
    pt,
    pr,
    pb,
    pl,
    px,
    py,
    ...rest
  } = props

  const { theme } = useTheme()
  const fontScale = useFontScale()

  const [category, key] = variant.split('.') as [string, string]

  // Safely extract style properties with proper fallbacks
  let styleConfig: {
    size: number
    weight: string
    lineHeight: number
    fontFamily: string
  } = {
    size: 16,
    weight: '400',
    lineHeight: 1.5,
    fontFamily: 'System',
  }

  // Safely get the variant style
  try {
    if (
      category === 'text' &&
      key &&
      theme.typography.text &&
      Object.prototype.hasOwnProperty.call(theme.typography.text, key)
    ) {
      styleConfig =
        theme.typography.text[key as keyof typeof theme.typography.text]
    } else if (
      category === 'heading' &&
      key &&
      theme.typography.heading &&
      Object.prototype.hasOwnProperty.call(theme.typography.heading, key)
    ) {
      styleConfig =
        theme.typography.heading[key as keyof typeof theme.typography.heading]
    } else if (
      category === 'component' &&
      key &&
      theme.typography.component &&
      Object.prototype.hasOwnProperty.call(theme.typography.component, key)
    ) {
      styleConfig =
        theme.typography.component[
          key as keyof typeof theme.typography.component
        ]
    } else {
      // Fallback to default
      console.warn(`Invalid variant: ${variant}, using fallback style`)
    }
  } catch (error) {
    console.warn(`Error processing typography variant: ${variant}`, error)
  }

  // Apply font size (with theme or direct value)
  let finalFontSize = styleConfig.size
  if (typeof fontSizeProp === 'number') {
    finalFontSize = fontSizeProp
  } else if (
    typeof fontSizeProp === 'string' &&
    theme.typography.text &&
    Object.prototype.hasOwnProperty.call(theme.typography.text, fontSizeProp) &&
    theme.typography.text[fontSizeProp as keyof typeof theme.typography.text]
  ) {
    finalFontSize =
      theme.typography.text[fontSizeProp as keyof typeof theme.typography.text]
        .size
  }

  // Scale font size according to device settings
  const scaledFontSize = finalFontSize * fontScale

  // Handle line height scaling with a more controlled approach
  const scaledLineHeight =
    lineHeightProp !== undefined
      ? lineHeightProp
      : styleConfig.lineHeight * finalFontSize * Math.min(fontScale, 1.2) // Limit line height scaling

  // Build the final text style
  const textStyle: TextStyle = {
    fontFamily: styleConfig.fontFamily,
    fontSize: scaledFontSize,
    fontWeight: (fontWeightProp || styleConfig.weight) as FontWeight,
    lineHeight: scaledLineHeight,
    color:
      colorProp && theme.colors[colorProp]
        ? theme.colors[colorProp]
        : theme.colors.textPrimary,
  }

  // Process spacing props
  const spacingStyle = getSpacingStyle(
    { m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py },
    theme.spacing
  )

  return (
    <RNText
      ref={ref}
      allowFontScaling={false} // We handle font scaling ourselves with useFontScale
      {...rest}
      style={[textStyle, spacingStyle, style]}
    >
      {children}
    </RNText>
  )
})

// Display name for debugging
Text.displayName = 'Text'
