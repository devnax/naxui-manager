import { GlobalCSSType } from "naxcss"
import { AliasesTypes } from "../css/types";


export type ColorType = {
    color: string;
    text: string;
}
export interface ThemeColorsOptions {
    common: string;
    paper: string;
    divider: string;
    text: string;
    subtext: string;

    primary: ColorType;
    secondary: ColorType;
    info: ColorType;
    success: ColorType;
    error: ColorType;
    warning: ColorType;
}


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

export interface ThemeOptionsPartial {
    globalStyle?: GlobalCSSType<AliasesTypes>,
    breakpoints?: { [key: string]: number };
    colors?: {
        common?: string;
        paper?: string;
        divider?: string;
        text?: string;
        subtext?: string;

        primary?: Partial<ColorType>;
        secondary?: Partial<ColorType>;
        info?: Partial<ColorType>;
        success?: Partial<ColorType>;
        error?: Partial<ColorType>;
        warning?: Partial<ColorType>;
    };
    typography?: Partial<ThemeTypographyOptions>;
    shadow?: (num: number) => string;
    interfaces?: { [key: string]: () => InterfaceType };
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

export type ObjectType = { [key: string]: any }
export type StateKeys = "current_theme" | "dispatch"
export type BreakpointsType = "xs" | "sm" | "md" | "lg" | "xl"


export type ColorsRefTypes =
    | "color.common"
    | "color.paper"
    | "color.divider"
    | "color.text"
    | "color.subtext"
    | "color.primary"
    | "color.primary.text"
    | "color.secondary"
    | "color.secondary.text"
    | "color.info"
    | "color.info.text"
    | "color.success"
    | "color.success.text"
    | "color.error"
    | "color.error.text"
    | "color.warning"
    | "color.warning.text";


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