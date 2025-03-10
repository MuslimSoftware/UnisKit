// This file is a fallback for using MaterialIcons on Android and web.

import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export type IconSymbolName = keyof typeof ICON_MAP

const ICON_MAP = {
  'house.fill': 'home',
  'chevron.right': 'chevron-right',
  'person.circle.fill': 'account-circle',
  gear: 'settings',
  'camera.fill': 'camera-alt',
  'location.fill': 'location-on',
  pencil: 'edit',
  'envelope.fill': 'email',
  link: 'link',
  'square.and.pencil': 'edit-square',
  'lock.fill': 'lock',
} as const

interface IconSymbolProps {
  name: IconSymbolName
  size?: number
  color?: string
  style?: StyleProp<TextStyle>
}

export const IconSymbol: React.FC<IconSymbolProps> = ({
  name,
  size = 24,
  color,
  style,
}) => {
  return (
    <MaterialIcons
      name={ICON_MAP[name]}
      size={size}
      color={color}
      style={style}
    />
  )
}
