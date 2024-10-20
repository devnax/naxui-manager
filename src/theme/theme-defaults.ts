import { ThemeOptionInput, ThemeTypographyType } from './types'

export const lightColorPallete = {
    text: {
        primary: "#212B36",
        secondary: "#637381",
    },
    background: {
        primary: "#FFFFFF",
        secondary: "#EDEFF7",
    },
    divider: {
        primary: "#C0C4CC",   // Light gray (to match the primary background)
        secondary: "#DADCE0"
    }
}

export const darkColorPallete = {
    text: {
        primary: "#FFFFFF",
        secondary: "#C4CDD5",
    },
    background: {
        primary: "#272727",
        secondary: "#1E1E1E",
    },
    divider: {
        primary: "#3D3D3D",
        secondary: "#333333"
    }
}

export const ThemeColors = {
    ...lightColorPallete,
    brand: {
        primary: "#3b82f6",
        secondary: "#60a5fa",
        text: "#FFFFFF"
    },
    accent: {
        primary: "#14b8a6",
        secondary: "#2dd4bf",
        text: "#FFFFFF"
    },
    info: {
        primary: "#0ea5e9",
        secondary: "#60a5fa",
        text: "#FFFFFF"
    },
    success: {
        primary: "#22c55e",
        secondary: "#4ade80",
        text: "#FFFFFF"
    },
    warning: {
        primary: "#f59e0b",
        secondary: "#fbbf24",
        text: "#FFFFFF"
    },
    danger: {
        primary: "#ef4444",
        secondary: "#f87171",
        text: "#FFFFFF"
    },
}


export const ThemeTypography: ThemeTypographyType = {
    fontFamily: '"Inter",sans-serif,"Helvetica","Arial"',
    h1: {
        fontSize: 47.78,
        lineHeight: 1.3,
        fontWeight: 400,
    },
    h2: {
        fontSize: 39.81,
        lineHeight: 1.35,
        fontWeight: 400,
    },
    h3: {
        fontSize: 33.18,
        lineHeight: 1.4,
        fontWeight: 400,
    },
    h4: {
        fontSize: 27.65,
        lineHeight: 1.45,
        fontWeight: 400,
    },
    h5: {
        fontSize: 27.65,
        lineHeight: 1.5,
        fontWeight: 400,
    },
    h6: {
        fontSize: 23.04,
        lineHeight: 1.55,
        fontWeight: 400,
    },
    text: {
        fontSize: 16,
        lineHeight: 1.6,
        fontWeight: 400,
    },
    button: {
        fontSize: 13.33,
        lineHeight: 1.6,
        fontWeight: 500,
    },
    small: {
        fontSize: 12.33,
        lineHeight: 1.6,
        fontWeight: 400,
    }
}

export default {
    name: "light",
    rtl: false,
    shadow: (num: number) => num ? (`0px 0px 2px -1px rgba(0,0,0,0.15), 0px ${num}px ${num}px 0px rgba(0,0,0,0.10), 0px ${num + 1}px ${num + 1}px -${num + 1}px rgba(0,0,0,0.12)`) : num,
    globalStyle: {},
    colors: ThemeColors,
    typography: ThemeTypography,
    interfaces: {}
} as ThemeOptionInput
