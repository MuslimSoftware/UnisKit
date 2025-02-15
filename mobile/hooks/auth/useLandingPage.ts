import { router } from 'expo-router'

export function useLandingPage() {
  const handleEmailLogin = () => {
    router.push('/login')
  }

  const handleEmailSignup = () => {
    router.push('/email')
  }

  return {
    handleEmailLogin,
    handleEmailSignup
  }
} 