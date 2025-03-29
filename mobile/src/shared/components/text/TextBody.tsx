import React from 'react'
// Import the base component and necessary types
import { ThemedText, TextAliasProps } from './ThemedText'

// Define and export the alias
export const TextBody = (props: TextAliasProps) => (
  <ThemedText variant="body1" {...props} />
)
