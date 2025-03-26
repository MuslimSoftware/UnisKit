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

export interface AvatarProps {
  alt?: string
  src?: string
  variant?: 'circular' | 'rounded' | 'square'
  size?: 'small' | 'medium' | 'large'
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success'
    | 'default'
  style?: ViewStyle
  children?: React.ReactNode
}

export const Avatar: React.FC<AvatarProps> = ({
  alt,
  src,
  variant = 'circular',
  size = 'medium',
  color = 'default',
  style,
  children,
}) => {
  const { theme } = useTheme()

  const getSize = () => {
    switch (size) {
      case 'small':
        return 32
      case 'large':
        return 56
      default:
        return 40
    }
  }

  const getBorderRadius = () => {
    switch (variant) {
      case 'rounded':
        return theme.shape.borderRadius
      case 'square':
        return 0
      default:
        return getSize() / 2
    }
  }

  const getBackgroundColor = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main
      case 'secondary':
        return theme.palette.secondary.main
      case 'error':
        return theme.palette.error.main
      case 'warning':
        return theme.palette.warning.main
      case 'info':
        return theme.palette.info.main
      case 'success':
        return theme.palette.success.main
      default:
        return theme.palette.background.paper
    }
  }

  const getTextColor = () => {
    switch (color) {
      case 'primary':
      case 'secondary':
      case 'error':
      case 'warning':
      case 'info':
      case 'success':
        return theme.palette.background.paper
      default:
        return theme.palette.text.primary
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  const avatarSize = getSize()

  const styles = StyleSheet.create({
    avatar: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: getBorderRadius(),
      backgroundColor: getBackgroundColor(),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      ...style,
    },
    text: {
      color: getTextColor(),
      fontSize: avatarSize / 2,
      fontWeight: '500',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  })

  // If there's an image source, render it
  if (src) {
    return (
      <View style={styles.avatar}>
        {/* In a real implementation, you would use Image component from react-native */}
        <View style={styles.image} />
      </View>
    )
  }

  // If there are children, render them
  if (children) {
    return <View style={styles.avatar}>{children}</View>
  }

  // Otherwise, render initials
  return (
    <View style={styles.avatar}>
      <Text style={styles.text}>{alt ? getInitials(alt) : '?'}</Text>
    </View>
  )
}

export default Avatar
