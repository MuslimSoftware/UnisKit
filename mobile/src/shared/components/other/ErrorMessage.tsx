import React from 'react'
import { StyleSheet } from 'react-native'
import { Caption } from './typography'
import { useTheme } from '../../hooks/useTheme'

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
    <Caption color={theme.colors.error} style={styles.text}>
      {message || fallback}
    </Caption>
  )
}

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
  },
})
