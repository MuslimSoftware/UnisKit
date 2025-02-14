const path = require('path')
const dotenv = require('dotenv')

// Load environment variables based on the environment
const ENV = process.env.APP_ENV || 'development'
const envPath = path.resolve(__dirname, `.env.${ENV}`)
dotenv.config({ path: envPath })

module.exports = {
  name: 'FullStackTemplate',
  slug: 'fullstack-template',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/splash.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.yourusername.fullstacktemplate',
    // Allow cleartext traffic for development
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: ENV === 'development'
      }
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.yourusername.fullstacktemplate',
    // Add network security config
    networkSecurityConfig: ENV === 'development'
  },
  web: {
    favicon: './assets/images/favicon.png'
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true
  },
  scheme: 'myapp',
  extra: {
    // Expose environment variables to the app
    env: ENV,
    apiUrl: process.env.API_URL,
    iosApiUrl: process.env.IOS_API_URL,
    androidApiUrl: process.env.ANDROID_API_URL,
    bypassAuth: process.env.BYPASS_AUTH === 'true',
    autoFillCredentials: process.env.AUTO_FILL_CREDENTIALS === 'true',
    autoFillEmail: process.env.AUTO_FILL_EMAIL,
    eas: {
      projectId: 'your-project-id'
    }
  },
  // Development settings
  development: {
    developmentClient: true,
    distribution: 'internal'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  // Add network security settings
  packagerOpts: {
    config: 'metro.config.js',
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    // Allow cleartext traffic in development
    dev: true,
    https: false
  },
  newArchEnabled: true
} 