const BASE = 8;

export const spacing = {
  // Base spacing units
  none: 0,
  xs: BASE * 0.5,    // 4
  sm: BASE,          // 8
  md: BASE * 2,      // 16
  lg: BASE * 3,      // 24
  xl: BASE * 4,      // 32
  '2xl': BASE * 6,   // 48
  '3xl': BASE * 8,   // 64
  '4xl': BASE * 12,  // 96
  '5xl': BASE * 16,  // 128

  // Component specific spacing
  container: {
    sm: BASE * 2,    // 16
    md: BASE * 3,    // 24
    lg: BASE * 4,    // 32
  },

  // Layout specific spacing
  layout: {
    gutter: BASE * 2,      // 16
    margin: BASE * 2,      // 16
    padding: BASE * 3,     // 24
  },
} as const;

// Helper function to get custom spacing
export const getSpacing = (multiplier: number): number => BASE * multiplier; 