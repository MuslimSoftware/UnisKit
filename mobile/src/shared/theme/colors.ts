import { ColorPalette } from './types';

export const lightColors: ColorPalette = {
  // Base colors
  white: '#FFFFFF',
  black: '#000000',

  // Gray scale
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',

  // Brand colors
  primary: '#2f95dc',    // Your existing primary color
  secondary: '#FF6B6B',  // You can adjust this

  // Semantic colors
  success: '#4CAF50',    // Your existing success color
  error: '#F44336',      // Your existing error color
  warning: '#FFC107',    // Your existing warning color
  info: '#2196F3',       // Your existing info color
} as const;

export const darkColors: ColorPalette = {
  // Base colors - inverted for dark theme
  white: '#000000',
  black: '#FFFFFF',

  // Gray scale - inverted and adjusted for dark theme
  gray700: '#F5F5F5',
  gray600: '#EEEEEE',
  gray500: '#E0E0E0',
  gray400: '#BDBDBD',
  gray300: '#757575',
  gray200: '#616161',
  gray100: '#424242',

  // Brand colors - adjusted for dark theme
  primary: '#4dabea',    // Lighter version of primary
  secondary: '#FF8787',  // Lighter version of secondary

  // Semantic colors - adjusted for better visibility in dark mode
  success: '#66BB6A',
  error: '#EF5350',
  warning: '#FFCA28',
  info: '#42A5F5',
} as const; 