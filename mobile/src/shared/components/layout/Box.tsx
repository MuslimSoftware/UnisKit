import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

export interface BoxProps {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  padding?: number | string
  margin?: number | string
  width?: number | string
  height?: number | string
  backgroundColor?: string
  borderRadius?: number
  flex?: number
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
}

const Box: React.FC<BoxProps> = ({
  children,
  style,
  padding,
  margin,
  width,
  height,
  backgroundColor,
  borderRadius,
  flex,
  alignItems,
  justifyContent,
  flexDirection,
  flexWrap,
}) => {
  const boxStyles = StyleSheet.create({
    box: {
      padding,
      margin,
      width,
      height,
      backgroundColor,
      borderRadius,
      flex,
      alignItems,
      justifyContent,
      flexDirection,
      flexWrap,
    } as ViewStyle,
  })

  return <View style={[boxStyles.box, style]}>{children}</View>
}

export default Box
