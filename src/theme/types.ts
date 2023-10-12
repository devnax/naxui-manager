import { GlobalCSSType } from "naxcss"
import { AliasesTypes } from "../css/types";

export type ObjectType = { [key: string]: any }
export type StateKeys = "current_theme" | "dispatch"


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

export type InterfaceType = { [key: string]: any }


// ========== Theme Input 

export interface ThemeOptionInput {
    globalStyle?: GlobalCSSType<AliasesTypes>,
    breakpoints?: { [key: string]: number };
    colors?: {
        paper?: string;
        primary?: string;
        secondary?: string;
        info?: string;
        success?: string;
        error?: string;
        warning?: string;
    };
    typography?: Partial<ThemeTypographyOptions>;
    interfaces?: { [key: string]: () => InterfaceType };
}


// =========== Main Theme Options

export type ThemeOptionColorType = {
    main: string;
    light: string;
    dark: string;
    text: string;
    subtext: string;
    divider: string;
}

export interface ThemeColorsOptions {
    paper: ThemeOptionColorType;
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
    interfaces: { [key: string]: (userProps: InterfaceType) => InterfaceType };
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
    | "fontsize.block"


export type ColorsRefTypes =
    | "color.paper"
    | "color.paper.main"
    | "color.paper.light"
    | "color.paper.dark"
    | "color.paper.text"
    | "color.paper.subtext"
    | "color.paper.divider"
    | "color.primary"
    | "color.primary.main"
    | "color.primary.light"
    | "color.primary.dark"
    | "color.primary.text"
    | "color.primary.subtext"
    | "color.primary.divider"
    | "color.secondary"
    | "color.secondary.main"
    | "color.secondary.light"
    | "color.secondary.dark"
    | "color.secondary.text"
    | "color.secondary.subtext"
    | "color.secondary.divider"
    | "color.info"
    | "color.info.main"
    | "color.info.light"
    | "color.info.dark"
    | "color.info.text"
    | "color.info.subtext"
    | "color.info.divider"
    | "color.success"
    | "color.success.main"
    | "color.success.light"
    | "color.success.dark"
    | "color.success.text"
    | "color.success.subtext"
    | "color.success.divider"
    | "color.warning"
    | "color.warning.main"
    | "color.warning.light"
    | "color.warning.dark"
    | "color.warning.text"
    | "color.warning.subtext"
    | "color.warning.divider"
    | "color.error"
    | "color.error.main"
    | "color.error.light"
    | "color.error.dark"
    | "color.error.text"
    | "color.error.subtext"
    | "color.error.divider"
