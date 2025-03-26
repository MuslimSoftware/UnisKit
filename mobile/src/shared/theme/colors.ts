// Base color palette
const palette = {
  // Neutrals
  neutral50: '#FAFAFA',
  neutral100: '#F5F5F5',
  neutral200: '#EEEEEE',
  neutral300: '#E0E0E0',
  neutral400: '#BDBDBD',
  neutral500: '#9E9E9E',
  neutral600: '#757575',
  neutral700: '#616161',
  neutral800: '#424242',
  neutral900: '#212121',

  // Brand colors
  primary500: '#2f95dc',
  primary600: '#2180c2',
  primary700: '#1b6da3',

  // Semantic colors
  success500: '#4CAF50',
  error500: '#F44336',
  warning500: '#FFC107',
  info500: '#2196F3',
} as const;

// Semantic color mapping for light theme
export const lightThemeColors = {
  // Background colors
  backgroundPrimary: palette.neutral50,
  backgroundSecondary: palette.neutral100,
  backgroundTertiary: palette.neutral200,

  // Text colors
  textPrimary: palette.neutral900,
  textSecondary: palette.neutral700,
  textTertiary: palette.neutral500,
  textInverse: palette.neutral50,

  // Action colors
  actionPrimary: palette.primary500,
  actionPrimaryHover: palette.primary600,
  actionPrimaryPressed: palette.primary700,
  actionDisabled: palette.neutral300,

  // Border colors
  borderPrimary: palette.neutral200,
  borderSecondary: palette.neutral300,

  // Status colors
  success: palette.success500,
  error: palette.error500,
  warning: palette.warning500,
  info: palette.info500,
} as const;

// Semantic color mapping for dark theme
export const darkThemeColors = {
  // Background colors
  backgroundPrimary: palette.neutral900,
  backgroundSecondary: palette.neutral800,
  backgroundTertiary: palette.neutral700,

  // Text colors
  textPrimary: palette.neutral50,
  textSecondary: palette.neutral200,
  textTertiary: palette.neutral400,
  textInverse: palette.neutral900,

  // Action colors
  actionPrimary: palette.primary500,
  actionPrimaryHover: palette.primary600,
  actionPrimaryPressed: palette.primary700,
  actionDisabled: palette.neutral600,

  // Border colors
  borderPrimary: palette.neutral700,
  borderSecondary: palette.neutral600,

  // Status colors
  success: palette.success500,
  error: palette.error500,
  warning: palette.warning500,
  info: palette.info500,
} as const; 