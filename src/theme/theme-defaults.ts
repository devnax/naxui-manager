import { ThemeOptionInput, ThemeTypographyType } from './types'

export const lightColorPallete = {
    text: {
        primary: "#212B36",
        secondary: "#637381",
    },
    background: {
        primary: "#FFFFFF",
        secondary: "#EDEFF7",
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
    }
}

export const ThemeColors = {
    ...lightColorPallete,
    brand: {
        primary: "#1967D2",
        secondary: "#5BE49B",
        text: "#FFFFFF"
    },
    accent: {
        primary: "#8E33FF",
        secondary: "#C684FF",
        text: "#FFFFFF"
    },
    info: {
        primary: "#00B8D9",
        secondary: "#61F3F3",
        text: "#FFFFFF"
    },
    success: {
        primary: "#22C55E",
        secondary: "#77ED8B",
        text: "#FFFFFF"
    },
    warning: {
        primary: "#FFAB00",
        secondary: "#FFD666",
        text: "#FFFFFF"
    },
    danger: {
        primary: "#FF5630",
        secondary: "#FFAC82",
        text: "#FFFFFF"
    },
}


export const ThemeTypography: ThemeTypographyType = {
    fontFamily: '"Inter","Helvetica","Arial",sans-serif',
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
        fontSize: 13.33,
        lineHeight: 1.6,
        fontWeight: 400,
    }
}

export default {
    name: "light",
    rtl: false,
    shadow: (num: number) => num ? (`0px 0px 2px -1px rgba(0,0,0,0.15), 0px ${num}px ${num}px 0px rgba(0,0,0,0.10), 0px ${num + 1}px ${num + 1}px -${num + 1}px rgba(0,0,0,0.12)`) : num,
    breakpoints: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536
    },
    globalStyle: {},
    colors: ThemeColors,
    typography: ThemeTypography,
    interfaces: {

    }
} as ThemeOptionInput
