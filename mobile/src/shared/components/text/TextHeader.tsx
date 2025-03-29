import React from 'react'
import { ThemedText, TextAliasProps } from './ThemedText'

export const TextHeader = (props: TextAliasProps) => (
  <ThemedText variant="h1" {...props} />
)
