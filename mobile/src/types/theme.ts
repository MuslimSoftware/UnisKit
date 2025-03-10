export interface Theme {
  scheme: 'light' | 'dark'
  colors: {
    text: string
    background: string
    tint: string
    icon: string
    tabIconDefault: string
    tabIconSelected: string
    secondaryText: string
    textSecondary: string
    card: string
    border: string
    error: string
  }
  input: {
    background: string
    text: string
    placeholder: string
  }
} 