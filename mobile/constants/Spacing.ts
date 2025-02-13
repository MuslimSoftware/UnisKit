export const Spacing = {
  // Layout spacing
  layout: {
    screen: 20,      // Main screen padding
    content: 24,     // Content section padding
    section: 16,     // Section padding
    input: 15,       // Input field padding
    small: 12,       // Small padding
    medium: 16,      // Medium padding
    large: 24,       // Large padding
  },

  // Element spacing
  spacing: {
    xxsmall: 4,     
    xsmall: 6,      
    small: 8,       
    medium: 12,     
    large: 16,      
    xlarge: 20,     
    xxlarge: 30,    
  },

  // Border radius
  radius: {
    small: 8,       
    medium: 12,     
    large: 16,      
    xlarge: 24,     
    pill: 28,       // Pill shape
    card: 8,        // Card corners
    circle: 9999,   
  },

  // Component sizes
  size: {
    icon: {
      small: 16,    // Small icons
      medium: 20,   // Medium icons
      large: 24,    // Large icons
      xlarge: 32,   // Extra large icons
    },
    element: {
      small: 32,    // Small interactive elements
      medium: 48,   // Medium interactive elements
      large: 64,    // Large interactive elements
    },
    header: 250,    // Header height
  },

  // Navigation
  navigation: {
    tabBarHeight: 80,
    androidTabBarPadding: 60,
    tabBarPadding: 16,  // Added for tab bar vertical padding
  },

  // Interactive
  interactive: {
    pressableArea: 10,  // Extra touch area
  },
} as const 