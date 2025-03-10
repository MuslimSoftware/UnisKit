import { useColorScheme } from 'react-native'
import { Theme } from '@/types/theme'

const lightTheme: Theme = {
  scheme: 'light',
  colors: {
    text: '#000000',
    background: '#FFFFFF',
    tint: '#2f95dc',
    icon: '#000000',
    tabIconDefault: '#CCCCCC',
    tabIconSelected: '#2f95dc',
    secondaryText: '#666666',
    textSecondary: '#666666',
    card: '#F0F0F0',
    border: '#E5E5E5',
    error: '#F44336',
  },
  input: {
    background: '#F0F0F0',
    text: '#000000',
    placeholder: '#666666',
  },
}

const darkTheme: Theme = {
  scheme: 'dark',
  colors: {
    text: '#FFFFFF',
    background: '#000000',
    tint: '#FFFFFF',
    icon: '#FFFFFF',
    tabIconDefault: '#CCCCCC',
    tabIconSelected: '#FFFFFF',
    secondaryText: '#999999',
    textSecondary: '#999999',
    card: '#333333',
    border: '#555555',
    error: '#F44336',
  },
  input: {
    background: '#333333',
    text: '#FFFFFF',
    placeholder: '#999999',
  },
}

export function useTheme(): Theme {
  const colorScheme = useColorScheme()
  return colorScheme === 'dark' ? darkTheme : lightTheme
} 