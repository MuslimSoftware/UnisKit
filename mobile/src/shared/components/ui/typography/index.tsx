import React from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'
import { Typography } from '@/constants/Typography'

interface CustomTextProps extends TextProps {
  variant?: 'primary' | 'secondary'
}

export const TextSmall: React.FC<CustomTextProps> = ({
  style,
  variant = 'primary',
  ...props
}) => (
  <Text
    style={[styles.small, variant === 'secondary' && styles.secondary, style]}
    {...props}
  />
)

export const TextMedium: React.FC<CustomTextProps> = ({
  style,
  variant = 'primary',
  ...props
}) => (
  <Text
    style={[styles.medium, variant === 'secondary' && styles.secondary, style]}
    {...props}
  />
)

export const TextLarge: React.FC<CustomTextProps> = ({
  style,
  variant = 'primary',
  ...props
}) => (
  <Text
    style={[styles.large, variant === 'secondary' && styles.secondary, style]}
    {...props}
  />
)

export const TextXLarge: React.FC<CustomTextProps> = ({
  style,
  variant = 'primary',
  ...props
}) => (
  <Text
    style={[styles.xlarge, variant === 'secondary' && styles.secondary, style]}
    {...props}
  />
)

const styles = StyleSheet.create({
  small: {
    fontSize: Typography.sizes.small,
    fontWeight: Typography.weights.regular,
  },
  medium: {
    fontSize: Typography.sizes.medium,
    fontWeight: Typography.weights.regular,
  },
  large: {
    fontSize: Typography.sizes.large,
    fontWeight: Typography.weights.regular,
  },
  xlarge: {
    fontSize: Typography.sizes.xlarge,
    fontWeight: Typography.weights.regular,
  },
  secondary: {
    opacity: 0.6,
  },
})
