import React from 'react'
import { Text as RNText } from 'react-native'
import { Text, TextProps } from './Text'

// Text sizes
export const TextXS = React.forwardRef<RNText, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text ref={ref} variant="text.xs" {...props} />
)

export const TextSM = React.forwardRef<RNText, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text ref={ref} variant="text.sm" {...props} />
)

export const TextBase = React.forwardRef<RNText, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text ref={ref} variant="text.base" {...props} />
)

export const TextLG = React.forwardRef<RNText, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text ref={ref} variant="text.lg" {...props} />
)

// Component-specific text elements
export const ButtonText = React.forwardRef<RNText, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text ref={ref} variant="component.button" {...props} />
)

export const Caption = React.forwardRef<RNText, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text ref={ref} variant="component.caption" {...props} />
)

export const Label = React.forwardRef<RNText, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text ref={ref} variant="component.label" {...props} />
)

// Set display names for debugging
TextXS.displayName = 'TextXS'
TextSM.displayName = 'TextSM'
TextBase.displayName = 'TextBase'
TextLG.displayName = 'TextLG'
ButtonText.displayName = 'ButtonText'
Caption.displayName = 'Caption'
Label.displayName = 'Label'
