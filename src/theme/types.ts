import { GlobalCSSType } from "naxcss"
import { AliasesTypes } from "../css/types";


export type ColorType = {
    light: string;
    dark: string;
    main: string;
    text: string;
}
export interface ThemeColorsOptions {
    background: Omit<ColorType, 'text'>;
    grey: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
    };
    primary: ColorType;
    secondary: ColorType;
    success: ColorType;
    error: ColorType;
    warning: ColorType;
    text: {
        primary: string;
        secondary: string;
    };
}

export type ScaleNameTypes = "minor-second" |
    "major-second" |
    "Minor-third" |
    "major-third" |
    "perfect-fourth" |
    "augmented-fourth" |
    "perfect-fifth" |
    "golden-ratio";

export type TextStyleProps = {
    fontSize?: string | number;
    fontFamily?: string;
    color?: string | number;
}

export interface ThemeTypographyOptions {
    fontFamily: string;
    scale: {
        name: ScaleNameTypes,
        baseFontSize: number;
        sizes: number[]
    };
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

export interface ThemeOptionsPartial {
    globalStyle?: GlobalCSSType<AliasesTypes>,
    breakpoints?: { [key: string]: number };
    colors?: {
        background?: Omit<ColorType, 'text'>;
        grey?: {
            1?: string;
            2?: string;
            3?: string;
            4?: string;
            5?: string;
            6?: string;
            7?: string;
            8?: string;
            9?: string;
            10?: string;
        };
        primary?: Partial<ColorType> & { main: string };
        secondary?: Partial<ColorType> & { main: string };
        success?: Partial<ColorType> & { main: string };
        error?: Partial<ColorType> & { main: string };
        warning?: Partial<ColorType> & { main: string };
        text?: {
            primary: string;
            secondary: string;
        };
    };
    typography?: Partial<ThemeTypographyOptions>;
    shadows?: { [key: number]: string };
    interfaces?: { [key: string]: () => InterfaceType };
}

export interface ThemeOptions {
    name: string;
    globalStyle: GlobalCSSType<AliasesTypes>,
    breakpoints: { [key in BreakpointsType]: number };
    colors: ThemeColorsOptions;
    typography: ThemeTypographyOptions;
    shadows: { [key: number]: string };
    interfaces: { [key: string]: (userProps: InterfaceType) => InterfaceType };
}




export type ObjectType = { [key: string]: any }

export type StateKeys = "current_theme" | "dispatch"


export type BreakpointsType = "xs" | "sm" | "md" | "lg" | "xl"

export type TextRefTypes =
    | "text"
    | "subtext"
    | "button"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";


export type ColorsRefTypes =
    | "background"
    | "background.main"
    | "background.light"
    | "background.dark"
    | "divider"
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
    | "success"
    | "success.main"
    | "success.light"
    | "success.dark"
    | "success.text"
    | "error"
    | "error.main"
    | "error.light"
    | "error.dark"
    | "error.text"
    | "warning"
    | "warning.main"
    | "warning.light"
    | "warning.dark"
    | "warning.text"
    | "text"
    | "text.primary"
    | "text.secondary"
    | "text.disabled"
    | "grey.1"
    | "grey.2"
    | "grey.3"
    | "grey.4"
    | "grey.5"
    | "grey.6"
    | "grey.7"
    | "grey.8"
    | "grey.9"
    | "grey.10"


export type ShadowRefTyeps =
    | "shadow.1"
    | "shadow.2"
    | "shadow.3"
    | "shadow.4"
    | "shadow.5"
    | "shadow.6"
    | "shadow.7"
    | "shadow.8"
    | "shadow.9"
    | "shadow.10";


export type TypographyRefTypes = "fontSize.1"
    | "fontSize.2"
    | "fontSize.3"
    | "fontSize.4"
    | "fontSize.5"
    | "fontSize.6"
    | "fontSize.7"
    | "fontSize.8"