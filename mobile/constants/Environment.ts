import { Platform } from 'react-native'
import Constants from 'expo-constants'

const getApiUrl = () => {
  const { apiUrl, iosApiUrl, androidApiUrl } = Constants.expoConfig?.extra || {}
  
  if (Platform.OS === 'android') {
    return androidApiUrl || apiUrl
  } else if (Platform.OS === 'ios') {
    return iosApiUrl || apiUrl
  }
  
  return apiUrl
}

export const Environment = {
  isDev: Constants.expoConfig?.extra?.env === 'development',
  apiUrl: getApiUrl(),
  devMode: {
    bypassAuth: Constants.expoConfig?.extra?.bypassAuth || false,
    autoFillCredentials: {
      enabled: Constants.expoConfig?.extra?.autoFillCredentials || false,
      email: Constants.expoConfig?.extra?.autoFillEmail || '',
      password: Constants.expoConfig?.extra?.autoFillPassword || '',
    },
  },
} as const

// Type guard to ensure environment is properly configured
if (!Environment.apiUrl) {
  throw new Error('API URL is not configured in environment')
}

export type Environment = typeof Environment 