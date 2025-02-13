export const Typography = {
  sizes: {
    // Titles
    title: 32,
    subtitle: 20,

    // Body text
    body: 16,
    bodySmall: 14,

    // Special cases
    otpInput: 24,
    buttonText: 16,
    waveEmoji: 32,
  },

  weights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
} as const

// Type helpers
export type FontSize = keyof typeof Typography.sizes
export type FontWeight = keyof typeof Typography.weights 