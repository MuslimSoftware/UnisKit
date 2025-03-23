export type ColorValue = string;

export interface ColorPalette {
  // Base colors
  white: ColorValue;
  black: ColorValue;

  // Gray scale
  gray100: ColorValue;
  gray200: ColorValue;
  gray300: ColorValue;
  gray400: ColorValue;
  gray500: ColorValue;
  gray600: ColorValue;
  gray700: ColorValue;

  // Brand colors
  primary: ColorValue;
  secondary: ColorValue;

  // Semantic colors
  success: ColorValue;
  error: ColorValue;
  warning: ColorValue;
  info: ColorValue;
}

export type FontWeight = 
  | 'normal' 
  | 'bold' 
  | '100' 
  | '200' 
  | '300' 
  | '400' 
  | '500' 
  | '600' 
  | '700' 
  | '800' 
  | '900';

export interface TypographyVariant {
  fontFamily?: string;
  fontSize: number;
  fontWeight: FontWeight;
  lineHeight: number;
  letterSpacing?: number;
}

export interface TypographyBase {
  h1: TypographyVariant;
  h2: TypographyVariant;
  h3: TypographyVariant;
  h4: TypographyVariant;
  subtitle1: TypographyVariant;
  subtitle2: TypographyVariant;
  body1: TypographyVariant;
  body2: TypographyVariant;
  button: TypographyVariant;
  caption: TypographyVariant;
  overline: TypographyVariant;
  baseFontSize: number;
}

export interface Typography extends TypographyBase {
  scale: (size: number) => number;
  scaleFont: (variant: TypographyVariant, scaleFactor?: number) => TypographyVariant;
}

export interface SpacingValues {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  base: number;
}

export interface Spacing extends SpacingValues {
  scale: (factor: number) => number;
}

export interface Theme {
  colors: ColorPalette;
  typography: Typography;
  spacing: SpacingValues;
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
} 