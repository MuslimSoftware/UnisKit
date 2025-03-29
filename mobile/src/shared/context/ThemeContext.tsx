import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { useColorScheme } from 'react-native'
import { Theme, lightTheme, darkTheme } from '@/shared/theme/theme'

type ThemeContextType = {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme()
  const [isDark, setIsDark] = useState(colorScheme === 'dark')

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark)
  }, [isDark])

  const theme = useMemo(() => {
    return isDark ? darkTheme : lightTheme
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Export the Theme type itself
export type { Theme }
