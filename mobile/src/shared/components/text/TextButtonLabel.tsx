import React from 'react'
import { ThemedText, TextAliasProps } from './ThemedText'

export const TextButtonLabel = (props: TextAliasProps) => (
  <ThemedText variant="button" {...props} />
)
