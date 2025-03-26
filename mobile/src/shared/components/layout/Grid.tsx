import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'
import {
  FlexDirection,
  FlexWrap,
  JustifyContent,
  AlignItems,
  AlignContent,
} from '../../theme/types'

export interface GridProps {
  children?: React.ReactNode
  container?: boolean
  item?: boolean
  spacing?: number
  direction?: FlexDirection
  wrap?: FlexWrap
  justifyContent?: JustifyContent
  alignItems?: AlignItems
  alignContent?: AlignContent
  xs?: number | 'auto'
  sm?: number | 'auto'
  md?: number | 'auto'
  lg?: number | 'auto'
  xl?: number | 'auto'
  style?: StyleProp<ViewStyle>
}

const Grid: React.FC<GridProps> = ({
  children,
  container = false,
  item = false,
  spacing = 0,
  direction = 'row',
  wrap = 'wrap',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  alignContent = 'stretch',
  xs,
  sm,
  md,
  lg,
  xl,
  style,
}) => {
  const { theme } = useTheme()

  const getFlexBasis = () => {
    // Default to 100% width if item but no breakpoints specified
    if (item && !xs && !sm && !md && !lg && !xl) {
      return '100%'
    }

    // Use the largest specified breakpoint
    // In a real implementation, we would use responsive breakpoints
    if (xl) return xl === 'auto' ? 'auto' : `${(xl / 12) * 100}%`
    if (lg) return lg === 'auto' ? 'auto' : `${(lg / 12) * 100}%`
    if (md) return md === 'auto' ? 'auto' : `${(md / 12) * 100}%`
    if (sm) return sm === 'auto' ? 'auto' : `${(sm / 12) * 100}%`
    if (xs) return xs === 'auto' ? 'auto' : `${(xs / 12) * 100}%`

    return undefined
  }

  const gridStyles = StyleSheet.create({
    grid: {
      ...(container && {
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent,
        alignItems,
        alignContent,
        margin: -theme.spacing(spacing / 2),
      }),
      ...(item && {
        padding: theme.spacing(spacing / 2),
        flexBasis: getFlexBasis(),
        flexGrow: 0,
        maxWidth: getFlexBasis(),
      }),
      ...(style as any),
    } as ViewStyle,
  })

  return <View style={gridStyles.grid}>{children}</View>
}

export default Grid
