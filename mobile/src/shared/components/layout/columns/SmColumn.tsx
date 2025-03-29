import React from 'react'
import { ViewProps, StyleProp, ViewStyle } from 'react-native'
import { BaseColumn } from './BaseColumn'
import { scale } from '@/shared/theme/spacing'

// Define props, excluding 'gap' as it's handled internally
interface SmColumnProps extends Omit<ViewProps, 'style'> {
  // Omit standard style, use specific StyleProp
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const GAP_SIZE = scale.sm // Use the small gap size

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
