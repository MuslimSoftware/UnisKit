export const scale = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 64,
};

type SpacingValue = {
    gap: number;
    padding: number;
    borderRadius: number;
}

export type Spacing = {
    section: SpacingValue;
    list: {
        gap?: number;
        borderRadius?: number;
        item: SpacingValue;
    }
    card: SpacingValue;
    button: SpacingValue;
    input: SpacingValue;
    select: SpacingValue;
}

export const spacing: Spacing = {
    section: {
        gap: scale.md,
        padding: scale.md,
        borderRadius: scale.md,
    },
    list: {
        gap: scale.md,
        borderRadius: scale.md,
        item: {
            gap: scale.md,
            padding: scale.md,
            borderRadius: scale.md,
        },
    },
    card: {
        padding: scale.md,
        borderRadius: scale.md,
        gap: scale.md,
    },
    button: {
        padding: scale.md,
        borderRadius: scale.xl,
        gap: scale.md,
    },
    input: {
        padding: scale.md,
        borderRadius: scale.md,
        gap: scale.md,
    },
    select: {
        padding: scale.md,
        borderRadius: scale.md,
        gap: scale.md,
    },
}