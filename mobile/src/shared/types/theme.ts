import { lightThemeColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { styles } from '../theme/styles';

// Theme type definitions
export type ColorValue = string;
export type Colors = {
  [K in keyof typeof lightThemeColors]: ColorValue;
};
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Styles = typeof styles;

// Main theme type
export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  styles: Styles;
}

// Utility types for style props
export interface SpacingProps {
  m?: keyof Spacing | number;
  mt?: keyof Spacing | number;
  mr?: keyof Spacing | number;
  mb?: keyof Spacing | number;
  ml?: keyof Spacing | number;
  mx?: keyof Spacing | number;
  my?: keyof Spacing | number;
  p?: keyof Spacing | number;
  pt?: keyof Spacing | number;
  pr?: keyof Spacing | number;
  pb?: keyof Spacing | number;
  pl?: keyof Spacing | number;
  px?: keyof Spacing | number;
  py?: keyof Spacing | number;
}

export interface ColorProps {
  bg?: keyof Colors;
  color?: keyof Colors;
  borderColor?: keyof Colors;
}

export interface TypographyProps {
  variant?: 'text.xs' | 'text.sm' | 'text.base' | 'text.lg' | 
           'heading.h1' | 'heading.h2' | 'heading.h3' | 'heading.h4' |
           'component.button' | 'component.caption' | 'component.label';
  fontSize?: 'xs' | 'sm' | 'base' | 'lg';
  fontWeight?: number | string;
  lineHeight?: number;
}

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  theme: Theme
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => Promise<void>
  toggleTheme: () => Promise<void>
  isDarkMode: boolean
}

export type ThemeProps = SpacingProps & ColorProps & TypographyProps; 