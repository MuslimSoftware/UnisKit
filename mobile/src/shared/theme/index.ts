export * from './types';
export * from './colors';
export * from './typography';
export * from './spacing';

import { Theme } from './types';
import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { spacingValues } from './spacing';

const baseTheme = {
  typography,
  spacing: spacingValues,
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  shadows: {
    sm: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0px 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0px 8px 16px rgba(0, 0, 0, 0.14)',
  },
} as const;

export const lightTheme: Theme = {
  ...baseTheme,
  colors: lightColors,
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors: darkColors,
  shadows: {
    sm: '0px 2px 4px rgba(255, 255, 255, 0.1)',
    md: '0px 4px 8px rgba(255, 255, 255, 0.12)',
    lg: '0px 8px 16px rgba(255, 255, 255, 0.14)',
  },
}; 