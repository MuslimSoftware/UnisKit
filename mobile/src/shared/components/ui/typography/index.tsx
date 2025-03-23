import React from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { typography } from '../../../theme/typography'
import { TypographyVariant } from '../../../theme/types'
import { useTheme } from '../../../hooks/useTheme'
import { ColorPalette } from '../../../theme/types'

type TextAlignment = 'left' | 'center' | 'right'

/**
 * Props for all typography components
 * @property align - Text alignment
 * @property truncate - Whether to truncate text with ellipsis
 * @property color - Text color from theme or custom color
 * @property numberOfLines - Number of lines to show (if truncating)
 * @property selectable - Whether text can be selected
 */
interface TypographyProps extends Omit<TextProps, 'numberOfLines'> {
  /** Text alignment */
  align?: TextAlignment
  /** Whether to truncate text with ellipsis */
  truncate?: boolean | number
  /** Text color from theme or custom color */
  color?: keyof ColorPalette | string
  /** Whether text can be selected */
  selectable?: boolean
}

const BaseText: React.FC<
  TypographyProps & { typographyStyle: TypographyVariant }
> = ({
  style,
  align,
  truncate,
  color,
  typographyStyle,
  selectable,
  ...props
}) => {
  const theme = useTheme()
  const textColor = color
    ? theme.colors[color as keyof ColorPalette] || color
    : theme.colors.black

  const numberOfLines =
    typeof truncate === 'number' ? truncate : truncate ? 1 : undefined

  return (
    <RNText
      numberOfLines={numberOfLines}
      selectable={selectable}
      style={[
        {
          fontFamily: typographyStyle.fontFamily,
          fontSize: typographyStyle.fontSize,
          fontWeight: typographyStyle.fontWeight,
          lineHeight: typographyStyle.lineHeight,
          letterSpacing: typographyStyle.letterSpacing,
          textAlign: align,
          color: textColor,
        },
        style,
      ]}
      {...props}
    />
  )
}

export const Header1: React.FC<TypographyProps> = (props) => (
  <BaseText
    {...props}
    typographyStyle={typography.h1}
    accessibilityRole="header"
  />
)

export const Header2: React.FC<TypographyProps> = (props) => (
  <BaseText
    {...props}
    typographyStyle={typography.h2}
    accessibilityRole="header"
  />
)

export const Header3: React.FC<TypographyProps> = (props) => (
  <BaseText
    {...props}
    typographyStyle={typography.h3}
    accessibilityRole="header"
  />
)

export const Header4: React.FC<TypographyProps> = (props) => (
  <BaseText
    {...props}
    typographyStyle={typography.h4}
    accessibilityRole="header"
  />
)

export const Subtitle1: React.FC<TypographyProps> = (props) => (
  <BaseText {...props} typographyStyle={typography.subtitle1} />
)

export const Subtitle2: React.FC<TypographyProps> = (props) => (
  <BaseText {...props} typographyStyle={typography.subtitle2} />
)

export const Body1: React.FC<TypographyProps> = (props) => (
  <BaseText {...props} typographyStyle={typography.body1} />
)

export const Body2: React.FC<TypographyProps> = (props) => (
  <BaseText {...props} typographyStyle={typography.body2} />
)

export const Button: React.FC<TypographyProps> = (props) => (
  <BaseText {...props} typographyStyle={typography.button} />
)

export const Caption: React.FC<TypographyProps> = (props) => (
  <BaseText {...props} typographyStyle={typography.caption} />
)

export const Overline: React.FC<TypographyProps> = (props) => (
  <BaseText {...props} typographyStyle={typography.overline} />
)
