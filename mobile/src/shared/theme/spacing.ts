import { SpacingValues } from './types';

const BASE_UNIT = 8;

export const spacingValues: SpacingValues = {
  // Base unit for calculations
  base: BASE_UNIT,

  // Predefined spacings
  xs: BASE_UNIT * 0.5,    // 4
  sm: BASE_UNIT,          // 8
  md: BASE_UNIT * 2,      // 16
  lg: BASE_UNIT * 3,      // 24
  xl: BASE_UNIT * 4,      // 32
  xxl: BASE_UNIT * 6,     // 48
};

// Utility function to scale spacing
export const scale = (factor: number): number => BASE_UNIT * factor;

// Helper function to get spacing in different units
export const getSpacing = (size: keyof SpacingValues | number): number => {
  if (typeof size === 'number') {
    return scale(size);
  }
  return spacingValues[size] || spacingValues.base;
}; 