import { ThemeOptionInput } from './types'

export const darkPaperColor = "#161618"
export const lightPaperColor = "#f6f6f7"

export const ThemeColors = {
    paper: lightPaperColor,
    primary: "#0066ff",
    secondary: '#0d9488',
    info: "#007bff",
    success: "#16a34a",
    error: '#dc2626',
    warning: {
        main: "#f59e0b",
        text: "#ffffff"
    }
}


export const ThemeTypography = {
    fontFamily: '"Inter","Helvetica","Arial",sans-serif',
    h1: {
        fontFamily: 'typography.font-family',
        fontSize: 'fontsize.h1'
    },
    h2: {
        fontFamily: 'typography.font-family',
        fontSize: 'fontsize.h2'
    },
    h3: {
        fontFamily: 'typography.font-family',
        fontSize: 'fontsize.h3'
    },
    h4: {
        fontFamily: 'typography.font-family',
        fontSize: 'fontsize.h4'
    },
    h5: {
        fontFamily: 'typography.font-family',
        fontSize: 'fontsize.h5'
    },
    h6: {
        fontFamily: 'typography.font-family',
        fontSize: 'fontsize.h6',
        fontWeight: 600
    },
    text: {
        fontFamily: 'typography.font-family',
        fontSize: 'fontsize.text',
        fontWeight: 400,
        color: "color.paper.text",
        lineHeight: 1.60
    },
    subtext: {
        fontFamily: 'typography.font-family',
        fontSize: 'fontsize.text',
        fontWeight: 400,
        color: "color.paper.subtext",
        lineHeight: 1.60
    },
    button: {
        fontFamily: 'typography.font-family',
        fontSize: 'fontsize.button',
        fontWeight: 500
    }
}

export default {
    name: "default",
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
        Button: () => {
            return {
                bgcolor: "red",
                sx: {
                    shadow: 5
                }
            }
        }
    },
} as ThemeOptionInput
