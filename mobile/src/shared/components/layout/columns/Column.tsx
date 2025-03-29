import React from 'react'
import { ViewProps, StyleProp, ViewStyle } from 'react-native'
import { BaseColumn } from './BaseColumn'
import { gaps } from '@/shared/theme/spacing'

// Define props, excluding 'gap' as it's handled internally
interface ColumnProps extends Omit<ViewProps, 'style'> {
  // Omit standard style, use specific StyleProp
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

// Use the medium gap size directly from the constant
const GAP_SIZE = gaps.medium

export const Column: React.FC<ColumnProps> = ({
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
