import React from 'react'
import {
  View as RNView,
  ViewProps as RNViewProps,
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

export interface ViewProps extends RNViewProps, ThemeProps {
  children?: React.ReactNode
  center?: boolean
  row?: boolean
  flex?: boolean | number
  wrap?: boolean
  justifyContent?: ViewStyle['justifyContent']
  alignItems?: ViewStyle['alignItems']
  alignSelf?: ViewStyle['alignSelf']
  padding?: SpacingKey | number
  margin?: SpacingKey | number
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

export const View = React.forwardRef<RNView, ViewProps>((props, ref) => {
  const {
    style,
    children,
    bg, // background color from theme
    borderColor,
    center,
    row,
    flex,
    wrap,
    justifyContent,
    alignItems,
    alignSelf,
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
    ...rest
  } = props

  const { theme } = useTheme()

  // Process additional shorthand padding and margin
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
    ...(wrap && {
      flexWrap: 'wrap',
    }),
    ...(justifyContent && {
      justifyContent,
    }),
    ...(alignItems && {
      alignItems,
    }),
    ...(alignSelf && {
      alignSelf,
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

  return (
    <RNView
      ref={ref}
      {...rest}
      style={[layoutStyle, colorStyle, spacingStyle, style]}
    >
      {children}
    </RNView>
  )
})

View.displayName = 'View'
