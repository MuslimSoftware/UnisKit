import { createTheme } from './createTheme';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#f48fb1',
      light: '#fce4ec',
      dark: '#f06292',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
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
  },
});

export default darkTheme;
