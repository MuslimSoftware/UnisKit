import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/shared/context/ThemeContext'

export interface AlertProps {
  severity?: 'error' | 'warning' | 'info' | 'success'
  variant?: 'standard' | 'filled' | 'outlined'
  title?: string
  action?: React.ReactNode
  onClose?: () => void
  style?: ViewStyle
  titleStyle?: TextStyle
  contentStyle?: TextStyle
  children: React.ReactNode
}

export const Alert: React.FC<AlertProps> = ({
  severity = 'info',
  variant = 'standard',
  title,
  action,
  onClose,
  style,
  titleStyle,
  contentStyle,
  children,
}) => {
  const { theme } = useTheme()

  const getBackgroundColor = () => {
    if (variant === 'filled') {
      switch (severity) {
        case 'error':
          return theme.palette.error.main
        case 'warning':
          return theme.palette.warning.main
        case 'info':
          return theme.palette.info.main
        case 'success':
          return theme.palette.success.main
      }
    } else if (variant === 'outlined') {
      return 'transparent'
    } else {
      switch (severity) {
        case 'error':
          return theme.palette.error.light
        case 'warning':
          return theme.palette.warning.light
        case 'info':
          return theme.palette.info.light
        case 'success':
          return theme.palette.success.light
      }
    }
  }

  const getTextColor = () => {
    if (variant === 'filled') {
      return theme.palette.background.paper
    } else {
      switch (severity) {
        case 'error':
          return theme.palette.error.dark
        case 'warning':
          return theme.palette.warning.dark
        case 'info':
          return theme.palette.info.dark
        case 'success':
          return theme.palette.success.dark
      }
    }
  }

  const getBorderColor = () => {
    if (variant === 'outlined') {
      switch (severity) {
        case 'error':
          return theme.palette.error.main
        case 'warning':
          return theme.palette.warning.main
        case 'info':
          return theme.palette.info.main
        case 'success':
          return theme.palette.success.main
      }
    }
    return 'transparent'
  }

  const styles = StyleSheet.create({
    alert: {
      backgroundColor: getBackgroundColor(),
      borderWidth: variant === 'outlined' ? 1 : 0,
      borderColor: getBorderColor(),
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1.5),
      ...style,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: title ? theme.spacing(0.5) : 0,
    },
    title: {
      color: getTextColor(),
      fontWeight: 'bold',
      fontSize: 16,
      ...titleStyle,
    },
    content: {
      color: getTextColor(),
      fontSize: 14,
      ...contentStyle,
    },
    closeButton: {
      marginLeft: theme.spacing(1),
    },
    closeIcon: {
      color: getTextColor(),
      fontSize: 18,
    },
    actionContainer: {
      marginTop: theme.spacing(1),
    },
  })

  return (
    <View style={styles.alert}>
      <View style={styles.header}>
        {title && <Text style={styles.title}>{title}</Text>}
        {onClose && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.content}>{children}</Text>
      {action && <View style={styles.actionContainer}>{action}</View>}
    </View>
  )
}

export default Alert
