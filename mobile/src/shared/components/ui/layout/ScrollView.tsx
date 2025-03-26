import React from 'react'
import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native'
import { useTheme } from '@/shared/hooks/useTheme'
import { ThemeProps, SpacingProps, ColorProps } from '@/shared/types/theme'

// Define valid spacing keys to use for shorthand props
type SpacingKey =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'

export interface ScrollViewProps extends RNScrollViewProps, ThemeProps {
  children?: React.ReactNode
  center?: boolean
  row?: boolean
  flex?: boolean | number
  padding?: SpacingKey | number
  margin?: SpacingKey | number
  contentPadding?: SpacingKey | number
  safe?: boolean // For SafeAreaView-like padding
}

// Process spacing properties from theme
const getSpacingStyle = (
  props: SpacingProps,
  themeSpacing: Record<string, any>
): StyleProp<ViewStyle> => {
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

export const ScrollView = React.forwardRef<RNScrollView, ScrollViewProps>(
  (props, ref) => {
    const {
      style,
      contentContainerStyle: contentContainerStyleProp,
      children,
      bg, // background color from theme
      borderColor,
      center,
      row,
      flex,
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
      // Additional shorthand props
      padding,
      margin,
      contentPadding,
      safe,
      ...rest
    } = props

    const { theme } = useTheme()

    // Process additional shorthand spacing
    const shorthandSpacing: Partial<SpacingProps> = {}
    if (padding !== undefined) {
      if (typeof padding === 'string') {
        shorthandSpacing.p = padding
      } else {
        shorthandSpacing.p = padding
      }
    }

    if (margin !== undefined) {
      if (typeof margin === 'string') {
        shorthandSpacing.m = margin
      } else {
        shorthandSpacing.m = margin
      }
    }

    // Process content padding for contentContainerStyle
    const contentPaddingValue = contentPadding
      ? typeof contentPadding === 'string'
        ? theme.spacing[contentPadding]
        : contentPadding
      : undefined

    // Process layout styles
    const layoutStyle: ViewStyle = {
      ...(center && {
        justifyContent: 'center',
        alignItems: 'center',
      }),
      ...(row && {
        flexDirection: 'row',
      }),
      ...(flex !== undefined && {
        flex: typeof flex === 'boolean' ? 1 : flex,
      }),
    }

    // Process colors from theme
    const colorStyle: ViewStyle = {
      ...(bg && {
        backgroundColor: theme.colors[bg],
      }),
      ...(borderColor && {
        borderColor: theme.colors[borderColor],
      }),
    }

    // Process spacing props
    const spacingStyle = getSpacingStyle(
      {
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
        ...shorthandSpacing,
      },
      theme.spacing
    )

    // Process content container style
    const contentContainerStyle = [
      contentPaddingValue !== undefined && { padding: contentPaddingValue },
      safe && {
        paddingTop: theme.spacing.md, // Adjust based on your safe area needs
        paddingBottom: theme.spacing.lg,
      },
      contentContainerStyleProp,
    ]

    return (
      <RNScrollView
        ref={ref}
        {...rest}
        style={[layoutStyle, colorStyle, spacingStyle, style]}
        contentContainerStyle={contentContainerStyle}
      >
        {children}
      </RNScrollView>
    )
  }
)

ScrollView.displayName = 'ScrollView'
