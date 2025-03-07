import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@/hooks/theme'
import { Typography } from '@/constants/Typography'
import { Spacing } from '@/constants/Spacing'

interface ErrorMessageProps {
  message?: string | null
  fallback?: string
}

export function ErrorMessage({
  message,
  fallback = 'An error occurred. Please try again.',
}: ErrorMessageProps) {
  const theme = useTheme()

  if (!message) return null

  return (
    <Text style={[styles.text, { color: theme.colors.error }]}>
      {message || fallback}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: Typography.sizes.small,
    marginTop: Spacing.spacing.xsmall,
  },
})
