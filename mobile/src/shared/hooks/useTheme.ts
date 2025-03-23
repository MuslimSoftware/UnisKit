import { useColorScheme } from 'react-native'
import { useFontScale } from '@/shared/hooks/useFontScale'
import { Theme, Typography, TypographyVariant, TypographyBase } from '@/shared/theme/types'
import { lightTheme, darkTheme } from '@/shared/theme'

const isTypographyVariant = (value: any): value is TypographyVariant => {
  return typeof value === 'object' && 
    'fontSize' in value && 
    'fontWeight' in value && 
    'lineHeight' in value
}

export function useTheme(): Theme {
  const colorScheme = useColorScheme()
  const fontScale = useFontScale()
  
  // Get the base theme based on color scheme
  const baseTheme = colorScheme === 'dark' ? darkTheme : lightTheme
  
  // Apply font scaling to typography variants if needed
  if (fontScale !== 1) {
    // Get all typography variant keys except the utility functions and baseFontSize
    const typographyKeys = Object.keys(baseTheme.typography).filter(
      (key): key is keyof TypographyBase => {
        const value = baseTheme.typography[key as keyof Typography]
        return isTypographyVariant(value)
      }
    )

    // Create scaled typography variants
    const scaledTypography = {
      ...baseTheme.typography,
      ...typographyKeys.reduce((acc, key) => ({
        ...acc,
        [key]: baseTheme.typography.scaleFont(
          baseTheme.typography[key] as TypographyVariant,
          fontScale
        )
      }), {} as Partial<TypographyBase>)
    }

    return {
      ...baseTheme,
      typography: scaledTypography,
    }
  }
  
  // Return the base theme if no scaling is needed
  return baseTheme
} 