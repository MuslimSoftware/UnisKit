import { typography, Typography } from './typography';
import { spacing, Spacing } from './spacing';
import { Colors } from './colors';

type ThemeColors = {
    brand: {
        primary: string;
        secondary: string;
        tertiary: string;
    }
    layout: {
        background: string;
        foreground: string;
        border: string;
    }
    indicators: {
        error: string;
        warning: string;
        info: string;
        success: string;
    }
    text: {
        primary: string;
        secondary: string;
        disabled: string;
    }
    button: {
        primary: string;
        secondary: string;
    }
}

export type Theme = {
    mode: 'light' | 'dark';
    colors: ThemeColors;
    typography: Typography;
    spacing: Spacing;
}

const baseTheme = {
    typography: typography,
    spacing: spacing,
}

export const lightTheme: Theme = {
    mode: 'light',
    colors: {
        brand: {
            primary: Colors.primary.light,
            secondary: Colors.secondary.light,
            tertiary: Colors.tertiary.light,
        },
        layout: {
            background: Colors.gray50,
            foreground: Colors.gray900,
            border: Colors.gray100,
        },
        indicators: {
            error: Colors.red500,
            warning: Colors.yellow500,
            info: Colors.blue500,
            success: Colors.green500,
        },
        text: {
            primary: Colors.gray900,
            secondary: Colors.gray600,
            disabled: Colors.gray400,
        },
        button: {
            primary: Colors.primary.light,
            secondary: Colors.secondary.light,
        },
    },
    ...baseTheme,
}

export const darkTheme: Theme = {
    mode: 'dark',
    colors: {
        brand: {
            primary: Colors.primary.dark,
            secondary: Colors.secondary.dark,
            tertiary: Colors.tertiary.dark,
        },
        layout: {
            background: Colors.gray900,
            foreground: Colors.gray50,
            border: Colors.gray800,
        },
        indicators: {
            error: Colors.red500,
            warning: Colors.yellow500,
            info: Colors.blue500,
            success: Colors.green500,
        },
        text: {
            primary: Colors.gray50,
            secondary: Colors.gray400,
            disabled: Colors.gray600,
        },
        button: {
            primary: Colors.primary.dark,
            secondary: Colors.secondary.dark,
        },
    },
    ...baseTheme,
}
