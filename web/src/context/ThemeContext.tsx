import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  lightTheme,
  darkTheme,
  Theme,
  ThemePreference,
  ThemeContextType,
  paddings,
  gaps,
  borderRadii,
  iconSizes,
  typography,
} from '@fullstack-template/shared';

// Function to apply theme variables to the root element
function applyThemeVariables(theme: Theme) {
  const root = document.documentElement;
  if (!root) return;

  // Apply colors
  Object.entries(theme.colors.brand).forEach(([key, value]) => {
    root.style.setProperty(`--color-brand-${key}`, value);
  });
  Object.entries(theme.colors.layout).forEach(([key, value]) => {
    root.style.setProperty(`--color-layout-${key}`, value);
  });
  Object.entries(theme.colors.indicators).forEach(([key, value]) => {
    root.style.setProperty(`--color-indicators-${key}`, value);
  });
  Object.entries(theme.colors.text).forEach(([key, value]) => {
    root.style.setProperty(`--color-text-${key}`, value);
  });
  // Flatten button colors if needed or apply differently

  // Apply spacing (example)
  Object.entries(paddings).forEach(([key, value]) => {
    root.style.setProperty(`--padding-${key}`, `${value}px`);
  });
  Object.entries(gaps).forEach(([key, value]) => {
    root.style.setProperty(`--gap-${key}`, `${value}px`);
  });
  Object.entries(borderRadii).forEach(([key, value]) => {
    root.style.setProperty(`--border-radius-${key}`, `${value}px`);
  });
    Object.entries(iconSizes).forEach(([key, value]) => {
    root.style.setProperty(`--icon-size-${key}`, `${value}px`);
  });

  // Apply typography (example - maybe just font family)
  root.style.setProperty('--font-family-base', theme.typography.body1.fontFamily);

  // Set data attribute for CSS selectors
  root.setAttribute('data-theme', theme.mode);
}

const STORAGE_KEY = 'themePreference';

const defaultContextValue: ThemeContextType = {
  theme: lightTheme, // Start with light by default
  isDark: false,
  themePreference: 'system',
  setThemePreference: () => { console.warn('ThemeProvider not mounted'); },
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themePreference, _setThemePreference] = useState<ThemePreference>(() => {
    // Initialize state from localStorage or default to 'system'
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored as ThemePreference;
      }
    } catch (e) {
      console.error('Failed to load theme preference from localStorage', e);
    }
    return 'system';
  });

  const prefersDarkQuery = useMemo(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null
  , []);
  
  const [systemPrefersDark, setSystemPrefersDark] = useState(prefersDarkQuery?.matches ?? false);

  // Listen for system theme changes
  useEffect(() => {
    if (!prefersDarkQuery) return;
    const listener = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    prefersDarkQuery.addEventListener('change', listener);
    return () => prefersDarkQuery.removeEventListener('change', listener);
  }, [prefersDarkQuery]);

  // Determine the effective theme mode
  const effectiveMode = useMemo(() => {
    return themePreference === 'system'
      ? (systemPrefersDark ? 'dark' : 'light')
      : themePreference;
  }, [themePreference, systemPrefersDark]);

  // Get the actual theme object
  const theme = useMemo(() => (effectiveMode === 'dark' ? darkTheme : lightTheme), [effectiveMode]);
  const isDark = theme.mode === 'dark';

  // Apply theme variables to DOM and update body background
  useEffect(() => {
    applyThemeVariables(theme);
    document.body.style.backgroundColor = theme.colors.layout.background;
    document.body.style.color = theme.colors.text.primary;
  }, [theme]);

  // Function to update preference and storage
  const setThemePreference = useCallback((preference: ThemePreference) => {
    try {
      localStorage.setItem(STORAGE_KEY, preference);
      _setThemePreference(preference);
    } catch (e) {
      console.error('Failed to save theme preference to localStorage', e);
    }
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    isDark,
    themePreference,
    setThemePreference,
  }), [theme, isDark, themePreference, setThemePreference]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 