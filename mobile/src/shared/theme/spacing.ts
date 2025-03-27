
export type Spacing = {
    section: {
        gap: number;
        padding: number;
    }
    list: {
        gap: number;
        item: {
            padding: number;
        }
    }
    card: {
        padding: number;
    }
    button: {
        padding: number;
    }
    input: {
        padding: number;
    }
    select: {
        padding: number;
    }
}

export const spacing: Spacing = {
    section: {
        gap: 16,
        padding: 16,
    },
    list: {
        gap: 16,
        item: {
            padding: 16,
        },
    },
    card: {
        padding: 16,
    },
    button: {
        padding: 16,
    },
    input: {
        padding: 16,
    },
    select: {
        padding: 16,
    },
}