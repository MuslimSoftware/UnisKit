import { router } from 'expo-router'
import { useTheme } from '@/hooks/theme'
import { Colors } from '@/constants/Colors'

export function useLogin() {
  const theme = useTheme()

  const handleEmailLogin = () => {
    router.push('/login')
  }

  const handleEmailSignup = () => {
    router.push('/email')
  }

  const socialButtons = {
    google: {
      background: Colors.white,
      text: Colors.black,
      icon: Colors.black,
      border: theme.colors.border,
    },
    apple: {
      background: theme.isDark ? Colors.white : Colors.black,
      text: theme.isDark ? Colors.black : Colors.white,
      icon: theme.isDark ? Colors.black : Colors.white,
    },
  }

  return {
    handleEmailLogin,
    handleEmailSignup,
    socialButtons,
  }
} 