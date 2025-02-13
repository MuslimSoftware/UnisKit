import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors'

export function useTheme() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const colors = {
    text: isDark ? Colors.white : Colors.black,
    background: isDark ? Colors.black : Colors.white,
    tint: isDark ? Colors.white : Colors.primary,
    icon: isDark ? Colors.white : Colors.black,
    tabIconDefault: Colors.gray300,
    tabIconSelected: isDark ? Colors.white : Colors.primary,
    secondaryText: isDark ? Colors.gray400 : Colors.gray500,
    card: isDark ? Colors.gray700 : Colors.gray100,
    border: isDark ? Colors.gray600 : Colors.gray200,
  }

  const getContrastText = (bgColor: string): string => {
    if (bgColor === Colors.white || bgColor === Colors.gray100) return Colors.black
    if (bgColor === Colors.black || bgColor === Colors.gray700) return Colors.white
    return colors.text
  }

  const theme = {
    isDark,
    colors,
    button: {
      primary: {
        background: Colors.primary,
        text: Colors.white,
        icon: Colors.white,
      },
      disabled: {
        background: colors.secondaryText,
        text: Colors.white,
      },
    },
    input: {
      background: colors.card,
      text: colors.text,
      placeholder: colors.secondaryText,
    },
    getContrastText,
  }

  return theme
}

export type Theme = ReturnType<typeof useTheme> 