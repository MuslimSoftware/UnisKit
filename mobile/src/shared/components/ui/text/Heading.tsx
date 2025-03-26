import React from 'react'
import { Text as RNText } from 'react-native'
import { Text, TextProps } from '@/shared/components/ui/text/Text'

// Types for heading levels
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'
interface HeadingProps extends Omit<TextProps, 'variant'> {
  level?: HeadingLevel
}

// Base Heading component
export const Heading = React.forwardRef<RNText, HeadingProps>((props, ref) => {
  const { level = 'h1', ...rest } = props
  return <Text ref={ref} variant={`heading.${level}`} {...rest} />
})

Heading.displayName = 'Heading'

// Specific heading components for convenience
export const H1 = React.forwardRef<RNText, Omit<HeadingProps, 'level'>>(
  (props, ref) => <Heading ref={ref} level="h1" {...props} />
)

export const H2 = React.forwardRef<RNText, Omit<HeadingProps, 'level'>>(
  (props, ref) => <Heading ref={ref} level="h2" {...props} />
)

export const H3 = React.forwardRef<RNText, Omit<HeadingProps, 'level'>>(
  (props, ref) => <Heading ref={ref} level="h3" {...props} />
)

export const H4 = React.forwardRef<RNText, Omit<HeadingProps, 'level'>>(
  (props, ref) => <Heading ref={ref} level="h4" {...props} />
)

H1.displayName = 'H1'
H2.displayName = 'H2'
H3.displayName = 'H3'
H4.displayName = 'H4'
