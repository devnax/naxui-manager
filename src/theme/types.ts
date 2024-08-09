import { GlobalCSSType } from "naxcss"
import { AliasesTypes } from "../css/types";

export type ObjectType = { [key: string]: any }

export type TextStyleProps = {
    fontSize?: string | number;
    fontFamily?: string;
}

export interface ThemeTypographyOptions {
    fontFamily: string;
    text: TextStyleProps;
    subtext: TextStyleProps;
    button: TextStyleProps;
    h1: TextStyleProps;
    h2: TextStyleProps;
    h3: TextStyleProps;
    h4: TextStyleProps;
    h5: TextStyleProps;
    h6: TextStyleProps;
}

export type ThemeOptionColorType = {
    light: string; // 300
    main: string; // 500
    dark: string; // 700
    text: string;
}

// ========== Theme Input 

export interface ThemeOptionInput {
    globalStyle?: GlobalCSSType<AliasesTypes>,
    breakpoints?: { [key: string]: number };
    colors?: {
        text?: Omit<Partial<ThemeOptionColorType>, "text">;
        paper?: Omit<Partial<ThemeOptionColorType>, "text">;
        primary?: Partial<ThemeOptionColorType>;
        secondary?: Partial<ThemeOptionColorType>;
        info?: Partial<ThemeOptionColorType>;
        success?: Partial<ThemeOptionColorType>;
        error?: Partial<ThemeOptionColorType>;
        warning?: Partial<ThemeOptionColorType>;
    };
    typography?: Partial<ThemeTypographyOptions>;
    interfaces?: { [name: string]: <P extends object>(defaultProps: P) => P };
}


// =========== Main Theme Options

export interface ThemeColorsOptions {
    text: Omit<ThemeOptionColorType, "text">;
    paper: Omit<ThemeOptionColorType, "text">;
    primary: ThemeOptionColorType;
    secondary: ThemeOptionColorType;
    info: ThemeOptionColorType;
    success: ThemeOptionColorType;
    error: ThemeOptionColorType;
    warning: ThemeOptionColorType;
}

export interface ThemeOptions {
    name: string;
    globalStyle: GlobalCSSType<AliasesTypes>,
    breakpoints: { [key in BreakpointsType]: number };
    colors: ThemeColorsOptions;
    typography: ThemeTypographyOptions;
    shadow: (num: number) => string;
    interfaces: { [name: string]: <P extends object>(defaultProps: P) => P };
}



export interface ThemeColorType {
    primary: string;
    secondary: string;
}
export interface Theme {
    ltr: boolean;
    breakpoints: { [key in BreakpointsType]: number };
    shadow: (num: number) => string;
    interfaces: { [name: string]: <P extends object>(defaultProps: P) => P };

    colors: {
        background: ThemeColorType;
        text: ThemeColorType;
        brand: ThemeColorType;
        success: ThemeColorType;
        info: ThemeColorType;
        warning: ThemeColorType;
        danger: ThemeColorType;
    };

    typography: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: {
            h1: 47.78
            h2: 39.81
            h3: 33.18
            h4: 27.65
            h5: 27.65
            h6: 23.04
            body: 16
            small: 13.33
        };
        lineHeight: {
            h1: 1.3,
            h2: 1.35,
            h3: 1.4,
            h4: 1.45,
            h5: 1.5,
            h6: 1.55,
            body: 1.6,
            small: 1.6,
        };
        fontWeight: {
            regular: 400,
            bold: 700,
        };
    };

    zIndex: {
        background: 0,         // Background layers (e.g., base content, backdrop)
        content: 100,          // Main content (e.g., standard UI elements)
        dropdown: 200,         // Dropdowns and side menus
        stickyHeader: 300,    // Sticky headers and footers
        modalBackdrop: 400,   // Backdrop for modals
        modal: 500,           // Modal windows
        popover: 600,         // Popovers and tooltips
        notification: 700,    // Notifications and toast messages
        overlay: 800,         // Full-screen overlays
        tooltip: 900,         // Tooltip elements
        topmost: 1000,
    };

    styles: {
        Button: {

        }
    }

}

export type BreakpointsType = "xs" | "sm" | "md" | "lg" | "xl"


// ============ Reference Types

export type TypographyRefTypes =
    | "fontsize.h1"
    | "fontsize.h2"
    | "fontsize.h3"
    | "fontsize.h4"
    | "fontsize.h5"
    | "fontsize.h6"
    | "fontsize.text"
    | "fontsize.button"


export type ColorsRefTypes =
    | "text"
    | "text.main"
    | "text.light"
    | "text.dark"

    | "paper"
    | "paper.main"
    | "paper.light"
    | "paper.dark"

    | "primary"
    | "primary.main"
    | "primary.light"
    | "primary.dark"
    | "primary.text"

    | "secondary"
    | "secondary.main"
    | "secondary.light"
    | "secondary.dark"
    | "secondary.text"

    | "info"
    | "info.main"
    | "info.light"
    | "info.dark"
    | "info.text"

    | "success"
    | "success.main"
    | "success.light"
    | "success.dark"
    | "success.text"

    | "warning"
    | "warning.main"
    | "warning.light"
    | "warning.dark"
    | "warning.text"

    | "error"
    | "error.main"
    | "error.light"
    | "error.dark"
    | "error.text"
