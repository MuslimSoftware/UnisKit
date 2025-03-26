import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultTheme from './defaultTheme';
import darkTheme from './darkTheme';
import { Theme, ThemeMode, ThemeContextType } from './types';

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  theme?: Theme;
  darkTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'light',
  theme = defaultTheme,
  darkTheme: customDarkTheme = darkTheme,
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode);
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    themeMode === 'light' ? theme : customDarkTheme
  );

  useEffect(() => {
    setCurrentTheme(themeMode === 'light' ? theme : customDarkTheme);
  }, [themeMode, theme, customDarkTheme]);

  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const contextValue = {
    theme: currentTheme,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
