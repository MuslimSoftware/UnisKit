import React, {
  PropsWithChildren,
  ElementType,
  ComponentPropsWithRef,
} from 'react'
import { View as RNView, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '@/shared/hooks/useTheme'
import { ColorPalette, Theme, ThemedStyleProps } from '@/shared/theme/types'
import { getSpacing } from '@/shared/theme/spacing'

type BaseThemeOwnProps<C extends ElementType = typeof RNView> =
  ThemedStyleProps & {
    as?: C
    style?: StyleProp<ViewStyle>
  }

export type BaseThemeProps<C extends ElementType = typeof RNView> =
  BaseThemeOwnProps<C> &
    Omit<ComponentPropsWithRef<C>, keyof BaseThemeOwnProps<C>>

export const BaseTheme = React.forwardRef(
  <C extends ElementType = typeof RNView>(
    {
      as,
      backgroundColor,
      borderColor,
      padding,
      paddingHorizontal,
      paddingVertical,
      margin,
      marginHorizontal,
      marginVertical,
      rounded,
      style,
      children,
      ...rest
    }: PropsWithChildren<BaseThemeProps<C>>,
    ref: React.ForwardedRef<any>
  ) => {
    const Component = as || RNView
    const theme = useTheme()
    const themedStyle = createThemedStyle(theme, {
      backgroundColor,
      borderColor,
      padding,
      paddingHorizontal,
      paddingVertical,
      margin,
      marginHorizontal,
      marginVertical,
      rounded,
    })

    return (
      <Component {...rest} ref={ref} style={[themedStyle, style]}>
        {children}
      </Component>
    )
  }
)

export const createThemedStyle = (
  theme: Theme,
  props: ThemedStyleProps
): ViewStyle => {
  const style: ViewStyle = {}

  // Handle colors
  if (props.backgroundColor) {
    style.backgroundColor =
      theme.colors[props.backgroundColor as keyof ColorPalette] ||
      props.backgroundColor
  }

  if (props.borderColor) {
    style.borderColor =
      theme.colors[props.borderColor as keyof ColorPalette] || props.borderColor
    style.borderWidth = 1 // Default border width when border color is specified
  }

  // Handle spacing
  if (props.padding !== undefined) {
    style.padding = getSpacing(props.padding)
  }
  if (props.paddingHorizontal !== undefined) {
    style.paddingHorizontal = getSpacing(props.paddingHorizontal)
  }
  if (props.paddingVertical !== undefined) {
    style.paddingVertical = getSpacing(props.paddingVertical)
  }
  if (props.margin !== undefined) {
    style.margin = getSpacing(props.margin)
  }
  if (props.marginHorizontal !== undefined) {
    style.marginHorizontal = getSpacing(props.marginHorizontal)
  }
  if (props.marginVertical !== undefined) {
    style.marginVertical = getSpacing(props.marginVertical)
  }

  // Handle border radius
  if (props.rounded && props.rounded !== 'none') {
    style.borderRadius = theme.borderRadius[props.rounded]
  }

  return style
}
