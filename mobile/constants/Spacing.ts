export const Spacing = {
  // Padding
  padding: {
    screen: 20,
    button: 16,
    content: 24,
    input: 15,
    sm: 12,
    md: 16,
    lg: 24,
  },

  // Margins
  margin: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 30,
  },

  // Border Radius
  borderRadius: {
    button: 28,
    card: 8,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  // Gaps
  gap: {
    inline: 4,
    xs: 6,
    sm: 12,
    md: 16,
    lg: 24,
  },

  // Component specific
  header: {
    height: 250,
  },

  // Navigation
  tabBar: {
    height: 80,
    androidPadding: 60,
  },

  // UI Elements
  icon: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  },

  // Touch targets
  touchTarget: {
    minSize: 32,
    mdSize: 48,
    hitSlop: 10,
  },
} as const 