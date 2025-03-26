// Export theme components
import { ThemeProvider, useTheme } from './ThemeContext';
import createTheme from './createTheme';
import defaultTheme from './defaultTheme';
import darkTheme from './darkTheme';
import * as themeTypes from './types';

// Export hooks
import useSystemTheme from './hooks/useSystemTheme';
import useThemeMode from './hooks/useThemeMode';
import useThemeColors from './hooks/useThemeColors';
import useThemeSpacing from './hooks/useThemeSpacing';
import useThemeTypography from './hooks/useThemeTypography';
import useThemeUtils from './hooks/useThemeUtils';

export {
  ThemeProvider,
  useTheme,
  createTheme,
  defaultTheme,
  darkTheme,
  themeTypes,
  // Hooks
  useSystemTheme,
  useThemeMode,
  useThemeColors,
  useThemeSpacing,
  useThemeTypography,
  useThemeUtils,
};
