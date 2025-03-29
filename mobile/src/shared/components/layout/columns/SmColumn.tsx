import React from 'react'
import { ViewProps, StyleProp, ViewStyle } from 'react-native'
import { BaseColumn } from './BaseColumn'
import { gaps } from '@/shared/theme/spacing'

// Define props, excluding 'gap' as it's handled internally
interface SmColumnProps extends Omit<ViewProps, 'style'> {
  // Omit standard style, use specific StyleProp
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

// Use the small gap size directly from the constant
const GAP_SIZE = gaps.small

export const SmColumn: React.FC<SmColumnProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <BaseColumn gap={GAP_SIZE} style={style} {...props}>
      {children}
    </BaseColumn>
  )
}
