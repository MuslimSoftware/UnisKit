import { ThemeContextValue } from '@/shared/types/theme'
import { useContext } from 'react'
import { ThemeContext } from '@/shared/context/ThemeContext'


export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}