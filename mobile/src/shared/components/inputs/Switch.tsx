import React from 'react'
import { Switch as RNSwitch, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface SwitchProps {
  value?: boolean
  onValueChange?: (value: boolean) => void
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'default'
  style?: ViewStyle
}

export const Switch: React.FC<SwitchProps> = ({
  value = false,
  onValueChange,
  disabled = false,
  color = 'primary',
  style,
}) => {
  const { theme } = useTheme()

  const getThumbColor = () => {
    if (disabled) return theme.palette.text.disabled
    if (!value) return '#f5f5f5'

    switch (color) {
      case 'primary':
        return theme.palette.primary.main
      case 'secondary':
        return theme.palette.secondary.main
      default:
        return theme.palette.text.primary
    }
  }

  const getTrackColor = () => {
    if (disabled) return theme.palette.text.disabled

    switch (color) {
      case 'primary':
        return theme.palette.primary.light
      case 'secondary':
        return theme.palette.secondary.light
      default:
        return theme.palette.text.secondary
    }
  }

  const styles = StyleSheet.create({
    switch: {
      ...style,
    },
  })

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      thumbColor={getThumbColor()}
      trackColor={{ false: theme.palette.divider, true: getTrackColor() }}
      ios_backgroundColor={theme.palette.divider}
      style={styles.switch}
    />
  )
}

export default Switch
