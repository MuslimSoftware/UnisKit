import { Theme } from '../types/theme';
import { lightThemeColors, darkThemeColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { styles } from './styles';

// Base theme with shared values
const baseTheme = {
  typography,
  spacing,
  styles,
} as const;

// Light theme extends base theme
export const lightTheme: Theme = {
  ...baseTheme,
  colors: lightThemeColors,
};

// Dark theme extends base theme with dark-specific overrides
export const darkTheme: Theme = {
  ...baseTheme,
  colors: darkThemeColors
};

// Export all theme-related types and values
export * from '../types/theme';
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './styles'; 