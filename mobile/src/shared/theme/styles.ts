// Shadow configuration type
type Shadow = {
  offset: { width: number; height: number };
  radius: number;
  elevation: number;
  opacity: number;
};

// Base styles that will be composed with theme-specific values
export const styles = {
  // Border radiuses
  borderRadius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },

  // Border widths
  borderWidth: {
    none: 0,
    thin: 1,
    medium: 2,
    thick: 4,
  },

  // Base shadow definitions
  shadow: {
    sm: {
      offset: { width: 0, height: 1 },
      radius: 2,
      elevation: 2,
    },
    md: {
      offset: { width: 0, height: 2 },
      radius: 4,
      elevation: 4,
    },
    lg: {
      offset: { width: 0, height: 4 },
      radius: 8,
      elevation: 8,
    },
  },

  // Z-index stack
  zIndex: {
    base: 0,
    above: 1,
    below: -1,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    toast: 1500,
  },

  button: {
    solid: {
      backgroundColor: 'actionPrimary',
      borderRadius: 'md',
      text: { color: 'textInverse' },
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 'thin',
      borderColor: 'actionPrimary',
      borderRadius: 'md',
      text: { color: 'actionPrimary' },
    },
    ghost: {
      backgroundColor: 'transparent',
      text: { color: 'actionPrimary' },
    },
    sizes: {
      sm: {
        paddingVertical: 'xs',
        paddingHorizontal: 'sm',
      },
      md: {
        paddingVertical: 'sm',
        paddingHorizontal: 'md',
      },
      lg: {
        paddingVertical: 'md',
        paddingHorizontal: 'lg',
      },
    },
    disabled: {
      opacity: 0.5,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
  },
} as const; 