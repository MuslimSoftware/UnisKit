import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from 'react-native'
import {
  ThemeProvider as NavigationThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native'
import { ThemeContextValue, ThemeMode } from '@/shared/types/theme'
import { lightTheme, darkTheme } from '@/shared/theme'

// Constants
const STORAGE_KEYS = {
  THEME_MODE: '@theme_mode',
} as const

// Theme utilities
const isValidThemeMode = (mode: string): mode is ThemeMode => {
  return ['light', 'dark', 'system'].includes(mode)
}

// Context
export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
)

// Storage utilities
class ThemeStorageError extends Error {
  constructor(message: string, public originalError: unknown) {
    super(message)
    this.name = 'ThemeStorageError'
  }
}

const ThemeStorage = {
  save: async (mode: ThemeMode): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, mode)
    } catch (error) {
      throw new ThemeStorageError('Failed to save theme mode', error)
    }
  },

  load: async (): Promise<ThemeMode | null> => {
    try {
      const savedMode = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE)
      if (savedMode && isValidThemeMode(savedMode)) {
        return savedMode
      }
      return null
    } catch (error) {
      throw new ThemeStorageError('Failed to load theme mode', error)
    }
  },
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme()
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system')
  const [error, setError] = useState<Error | null>(null)

  // Determine if dark mode is active
  const isDarkMode = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark'
    }
    return themeMode === 'dark'
  }, [themeMode, systemColorScheme])

  // Load saved theme on mount
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const savedMode = await ThemeStorage.load()
        if (savedMode) {
          setThemeModeState(savedMode)
        }
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error('Unknown error occurred')
        )
        console.error('Theme initialization failed:', error)
      }
    }
    initializeTheme()
  }, [])

  // Theme mode setter with storage
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    try {
      await ThemeStorage.save(mode)
      setThemeModeState(mode)
      setError(null)
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error('Unknown error occurred')
      )
      console.error('Failed to set theme mode:', error)
    }
  }, [])

  // Theme toggle handler
  const toggleTheme = useCallback(async () => {
    const newMode = isDarkMode ? 'light' : 'dark'
    await setThemeMode(newMode)
  }, [isDarkMode, setThemeMode])

  // Current theme computation
  const theme = useMemo(() => {
    return isDarkMode ? darkTheme : lightTheme
  }, [isDarkMode])

  // Navigation theme computation
  const navigationTheme = useMemo(() => {
    return isDarkMode ? DarkTheme : DefaultTheme
  }, [isDarkMode])

  // Context value memoization
  const contextValue = useMemo(
    (): ThemeContextValue => ({
      theme,
      themeMode,
      setThemeMode,
      toggleTheme,
      isDarkMode,
    }),
    [theme, themeMode, setThemeMode, toggleTheme, isDarkMode]
  )

  // If there's a critical error, you might want to handle it appropriately
  if (error) {
    console.warn('Theme system encountered an error:', error)
    // You could render a fallback UI or continue with default theme
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <NavigationThemeProvider value={navigationTheme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  )
}
