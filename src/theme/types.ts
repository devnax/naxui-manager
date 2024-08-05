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
