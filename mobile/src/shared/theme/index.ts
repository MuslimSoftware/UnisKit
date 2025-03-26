// Export theme components
import { ThemeProvider, useTheme } from '@/shared/context/ThemeContext';
import createTheme from '@/shared/theme/createTheme';
import defaultTheme from '@/shared/theme/defaultTheme';
import darkTheme from '@/shared/theme/darkTheme';
import * as themeTypes from '@/shared/theme/types';

// Export hooks
import useSystemTheme from '@/shared/hooks/useSystemTheme';
import useThemeMode from '@/shared/hooks/useThemeMode';
import useThemeColors from '@/shared/hooks/useThemeColors';
import useThemeSpacing from '@/shared/hooks/useThemeSpacing';
import useThemeTypography from '@/shared/hooks/useThemeTypography';
import useThemeUtils from '@/shared/hooks/useThemeUtils';

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
