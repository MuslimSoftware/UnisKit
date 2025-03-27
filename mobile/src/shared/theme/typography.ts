type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export type Typography = {
    h1: {
        fontFamily: string;
        fontSize: number;
        fontWeight: FontWeight;
        lineHeight: number;
    }
    h2: {
        fontFamily: string;
        fontSize: number;
        fontWeight: FontWeight;
        lineHeight: number;
    }
    h3: {
        fontFamily: string;
        fontSize: number;
        fontWeight: FontWeight;
        lineHeight: number;
    }
    h4: {
        fontFamily: string;
        fontSize: number;
        fontWeight: FontWeight;
        lineHeight: number;
    }
    h5: {
        fontFamily: string;
        fontSize: number;
        fontWeight: FontWeight;
        lineHeight: number;
    }
    h6: {
        fontFamily: string;
        fontSize: number;
        fontWeight: FontWeight;
        lineHeight: number;
    }
    body1: {
        fontFamily: string;
        fontSize: number;
        fontWeight: FontWeight;
        lineHeight: number;
    }
    body2: {
        fontFamily: string;
        fontSize: number;
        fontWeight: FontWeight;
        lineHeight: number;
    }
    button: {
        fontFamily: string;
        fontSize: number;
        fontWeight: FontWeight;
        lineHeight: number;
    }
    caption: {
        fontFamily: string;
        fontSize: number;
        fontWeight: FontWeight;
        lineHeight: number;
    }
}

export const typography: Typography = {
        h1: {
            fontFamily: 'Roboto',
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 40,
        },
        h2: {
            fontFamily: 'Roboto',
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 32,
        },
        h3: {
            fontFamily: 'Roboto',
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 28,
        },
        h4: {
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 24,
        },
        h5: {
            fontFamily: 'Roboto',
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 20,
        },
        h6: {
            fontFamily: 'Roboto',
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 16,
        },
        body1: {
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 24,
        },
        body2: {
            fontFamily: 'Roboto',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 20,
        },
        button: {
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 24,
        },
        caption: {
            fontFamily: 'Roboto',
            fontSize: 12,   
            fontWeight: 400,
            lineHeight: 16,
        },
    }