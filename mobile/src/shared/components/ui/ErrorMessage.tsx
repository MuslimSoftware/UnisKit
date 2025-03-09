import React from 'react'
import { StyleSheet } from 'react-native'
import { TextSmall } from './typography'
import { useTheme } from '@/features/theme/hooks/useTheme'

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
    <TextSmall style={[styles.text, { color: theme.colors.error }]}>
      {message || fallback}
    </TextSmall>
  )
}

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
  },
})
