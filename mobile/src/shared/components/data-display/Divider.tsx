import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'fullWidth' | 'inset' | 'middle'
  light?: boolean
  style?: ViewStyle
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'fullWidth',
  light = false,
  style,
}) => {
  const { theme } = useTheme()

  const getMargin = () => {
    if (variant === 'inset') {
      return orientation === 'horizontal'
        ? { marginLeft: theme.spacing(9) }
        : { marginTop: theme.spacing(1) }
    }
    if (variant === 'middle') {
      return orientation === 'horizontal'
        ? { marginLeft: theme.spacing(2), marginRight: theme.spacing(2) }
        : { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }
    }
    return {}
  }

  const styles = StyleSheet.create({
    divider: {
      backgroundColor: light
        ? theme.palette.divider.replace(/[\d.]+\)$/g, '0.08)')
        : theme.palette.divider,
      ...(orientation === 'horizontal'
        ? {
            height: 1,
            width: '100%',
          }
        : {
            width: 1,
            height: '100%',
          }),
      ...getMargin(),
      ...style,
    },
  })

  return <View style={styles.divider} />
}

export default Divider
