import { Typography, TypographyBase, TypographyVariant } from './types';

// Default font family - you can replace these with your preferred fonts
const defaultFontFamily = 'System';

// Base font size to use for scaling calculations
const BASE_FONT_SIZE = 16;

// Base typography definitions
const baseTypography: TypographyBase = {
  baseFontSize: BASE_FONT_SIZE,
  h1: {
    fontSize: 96,
    fontWeight: '300',
    lineHeight: 112,
    letterSpacing: -1.5,
    fontFamily: defaultFontFamily,
  },
  h2: {
    fontSize: 60,
    fontWeight: '300',
    lineHeight: 72,
    letterSpacing: -0.5,
    fontFamily: defaultFontFamily,
  },
  h3: {
    fontSize: 48,
    fontWeight: '400',
    lineHeight: 56,
    letterSpacing: 0,
    fontFamily: defaultFontFamily,
  },
  h4: {
    fontSize: 34,
    fontWeight: '400',
    lineHeight: 40,
    letterSpacing: 0.25,
    fontFamily: defaultFontFamily,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.15,
    fontFamily: defaultFontFamily,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    fontFamily: defaultFontFamily,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.5,
    fontFamily: defaultFontFamily,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    fontFamily: defaultFontFamily,
  },
  button: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 1.25,
    fontFamily: defaultFontFamily,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: defaultFontFamily,
  },
  overline: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 1.5,
    fontFamily: defaultFontFamily,
  },
};

// Scale function - scales a number based on the base font size
const scale = (size: number): number => {
  return Math.round(size * (BASE_FONT_SIZE / 16));
};

// Scale a typography variant based on a scale factor
const scaleFont = (variant: TypographyVariant, scaleFactor = 1): TypographyVariant => {
  return {
    ...variant,
    fontSize: Math.round(variant.fontSize * scaleFactor),
    lineHeight: Math.round(variant.lineHeight * scaleFactor),
    letterSpacing: variant.letterSpacing ? variant.letterSpacing * scaleFactor : undefined,
  };
};

// Export the typography with scaling functions
export const typography: Typography = {
  ...baseTypography,
  scale,
  scaleFont,
}; 