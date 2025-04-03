import React from 'react'
import { BaseColumn } from './BaseColumn'
import { gaps } from '@/shared/theme/spacing'
import { ViewProps } from 'react-native'

export const Column: React.FC<ViewProps> = ({
  children,
  ...props
}) => {

  return (
    <BaseColumn gap={gaps.medium} {...props}>
      {children}
    </BaseColumn>
  )
}
