import { Theme } from './types';

export interface ThemeOptions {
  palette?: Partial<Theme['palette']>;
  typography?: Partial<Theme['typography']>;
  shape?: Partial<Theme['shape']>;
  spacing?: number;
}

export const createTheme = (options: ThemeOptions = {}): Theme => {
  const {
    palette = {},
    typography = {},
    shape = {},
    spacing = 8,
  } = options;

  // Create the base theme
  const theme: Theme = {
    palette: {
      mode: 'light',
      primary: {
        light: '#7986cb',
        main: '#3f51b5',
        dark: '#303f9f',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff4081',
        main: '#f50057',
        dark: '#c51162',
        contrastText: '#fff',
      },
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
      warning: {
        light: '#ffb74d',
        main: '#ff9800',
        dark: '#f57c00',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      info: {
        light: '#64b5f6',
        main: '#2196f3',
        dark: '#1976d2',
        contrastText: '#fff',
      },
      success: {
        light: '#81c784',
        main: '#4caf50',
        dark: '#388e3c',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      background: {
        default: '#fafafa',
        paper: '#fff',
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
      ...palette,
    },
    typography: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontWeight: 300,
        fontSize: 96,
        lineHeight: 1.167,
        letterSpacing: -1.5,
      },
      h2: {
        fontWeight: 300,
        fontSize: 60,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      h3: {
        fontWeight: 400,
        fontSize: 48,
        lineHeight: 1.167,
        letterSpacing: 0,
      },
      h4: {
        fontWeight: 400,
        fontSize: 34,
        lineHeight: 1.235,
        letterSpacing: 0.25,
      },
      h5: {
        fontWeight: 400,
        fontSize: 24,
        lineHeight: 1.334,
        letterSpacing: 0,
      },
      h6: {
        fontWeight: 500,
        fontSize: 20,
        lineHeight: 1.6,
        letterSpacing: 0.15,
      },
      subtitle1: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.75,
        letterSpacing: 0.15,
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 1.57,
        letterSpacing: 0.1,
      },
      body1: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 0.15,
      },
      body2: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 1.43,
        letterSpacing: 0.15,
      },
      button: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 1.75,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
      },
      caption: {
        fontWeight: 400,
        fontSize: 12,
        lineHeight: 1.66,
        letterSpacing: 0.4,
      },
      overline: {
        fontWeight: 400,
        fontSize: 12,
        lineHeight: 2.66,
        letterSpacing: 1,
        textTransform: 'uppercase',
      },
      ...typography,
    },
    shape: {
      borderRadius: 4,
      ...shape,
    },
    spacing: (factor: number) => spacing * factor,
  };

  return theme;
};

export default createTheme;
