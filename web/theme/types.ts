import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';

// Theme types
export type ThemeMode = 'light' | 'dark';

export interface ThemePaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface ThemePalette {
  mode: ThemeMode;
  primary: ThemePaletteColor;
  secondary: ThemePaletteColor;
  error: ThemePaletteColor;
  warning: ThemePaletteColor;
  info: ThemePaletteColor;
  success: ThemePaletteColor;
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  divider: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  h5: TextStyle;
  h6: TextStyle;
  subtitle1: TextStyle;
  subtitle2: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  button: TextStyle;
  caption: TextStyle;
  overline: TextStyle;
}

export interface ThemeShape {
  borderRadius: number;
}

export interface ThemeSpacing {
  unit: number;
}

export interface Theme {
  palette: ThemePalette;
  typography: ThemeTypography;
  shape: ThemeShape;
  spacing: (factor: number) => number;
}

export interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

// Component types
export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';

export type TextFieldVariant = 'outlined' | 'filled' | 'standard';
export type TextFieldSize = 'small' | 'medium';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'button' | 'caption' | 'overline';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type JustifyContent = 
  | 'flex-start' | 'flex-end' | 'center' 
  | 'space-between' | 'space-around' | 'space-evenly';
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type AlignContent = 
  | 'flex-start' | 'flex-end' | 'center' 
  | 'stretch' | 'space-between' | 'space-around';

export type Elevation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

export type ProgressVariant = 'determinate' | 'indeterminate';
export type ProgressColor = ButtonColor;

export type Position = 'static' | 'relative' | 'absolute';

export type StyleCreator<Props, Styles> = (props: Props, theme: Theme) => Styles;
