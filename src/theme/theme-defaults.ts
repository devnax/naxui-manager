import { ThemeOptionInput } from './types'

export const lightColorPallete = {
    text: {
        dark: "#111111",
        main: "#212B36",
        light: "#637381",
    },
    paper: {
        light: "#F4F6F8",
        main: "#DFE3E8",
        dark: "#C4CDD5",
    }
}

export const darkColorPallete = {
    text: {
        dark: "#C4CDD5",
        main: "#FFFFFF",
        light: "#C4CDD5",
    },
    paper: {
        light: "#637381",
        main: "#454F5B",
        dark: "#212B36",
    }
}

export const ThemeColors = {
    ...lightColorPallete,

    primary: {
        light: "#5BE49B",
        main: "#00A76F",
        dark: "#007867",
        text: "#FFFFFF"
    },
    secondary: {
        light: "#C684FF",
        main: "#8E33FF",
        dark: "#5119B7",
        text: "#FFFFFF"
    },
    info: {
        light: "#61F3F3",
        main: "#00B8D9",
        dark: "#006C9C",
        text: "#FFFFFF"
    },
    success: {
        light: "#77ED8B",
        main: "#22C55E",
        dark: "#118D57",
        text: "#FFFFFF"
    },

    warning: {
        light: "#FFD666",
        main: "#FFAB00",
        dark: "#B76E00",
        text: "#FFFFFF"
    },
    error: {
        light: "#FFAC82",
        main: "#FF5630",
        dark: "#B71D18",
        text: "#FFFFFF"
    },
}


export const ThemeTypography = {
    fontFamily: '"Inter","Helvetica","Arial",sans-serif',
    h1: {
        fontFamily: 'typography.font-family',
        fontSize: "3.815rem"
    },
    h2: {
        fontFamily: 'typography.font-family',
        fontSize: "3.052rem"
    },
    h3: {
        fontFamily: 'typography.font-family',
        fontSize: "2.441rem"
    },
    h4: {
        fontFamily: 'typography.font-family',
        fontSize: "1.953rem"
    },
    h5: {
        fontFamily: 'typography.font-family',
        fontSize: "1.563rem"
    },
    h6: {
        fontFamily: 'typography.font-family',
        fontSize: "1.25rem",
        fontWeight: 600
    },
    text: {
        fontFamily: 'typography.font-family',
        fontSize: "1rem",
        fontWeight: 400,
        color: "common.text",
        lineHeight: 1.60
    },
    subtext: {
        fontFamily: 'typography.font-family',
        fontSize: "1rem",
        fontWeight: 400,
        color: "common.subtext",
        lineHeight: 1.60
    },
    button: {
        fontFamily: 'typography.font-family',
        fontSize: "0.875rem",
        fontWeight: 500
    }
}

export default {
    name: "light",
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
    interfaces: {}
} as ThemeOptionInput
