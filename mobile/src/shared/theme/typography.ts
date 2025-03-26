// Default font family
const defaultFontFamily = 'System';

// Base sizes and scales
const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
} as const;

const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// Typography variants
export const typography = {
  // Text styles
  text: {
    xs: {
      size: fontSizes.xs,
      weight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      fontFamily: defaultFontFamily,
    },
    sm: {
      size: fontSizes.sm,
      weight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      fontFamily: defaultFontFamily,
    },
    base: {
      size: fontSizes.base,
      weight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      fontFamily: defaultFontFamily,
    },
    lg: {
      size: fontSizes.lg,
      weight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      fontFamily: defaultFontFamily,
    },
  },

  // Heading styles
  heading: {
    h1: {
      size: fontSizes['5xl'],
      weight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      fontFamily: defaultFontFamily,
    },
    h2: {
      size: fontSizes['4xl'],
      weight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      fontFamily: defaultFontFamily,
    },
    h3: {
      size: fontSizes['3xl'],
      weight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
      fontFamily: defaultFontFamily,
    },
    h4: {
      size: fontSizes['2xl'],
      weight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
      fontFamily: defaultFontFamily,
    },
  },

  // Component specific text styles
  component: {
    button: {
      size: fontSizes.base,
      weight: fontWeights.medium,
      lineHeight: lineHeights.none,
      fontFamily: defaultFontFamily,
    },
    caption: {
      size: fontSizes.xs,
      weight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      fontFamily: defaultFontFamily,
    },
    label: {
      size: fontSizes.sm,
      weight: fontWeights.medium,
      lineHeight: lineHeights.none,
      fontFamily: defaultFontFamily,
    },
  },
} as const; 