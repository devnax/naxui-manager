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
    success: ColorType;
    error: ColorType;
    warning: ColorType;
}

export type ScaleNameTypes = "minor-second" |
    "major-second" |
    "minor-third" |
    "major-third" |
    "perfect-fourth" |
    "augmented-fourth" |
    "perfect-fifth" |
    "golden-ratio";

export type TextStyleProps = {
    fontSize?: string | number;
    fontFamily?: string;
}

export interface ThemeTypographyOptions {
    fontFamily: string;
    fontSize: number;
    sizes: number[];
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
        success?: Partial<ColorType>;
        error?: Partial<ColorType>;
        warning?: Partial<ColorType>;
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
    | "typography.font-family"
    | "typography.font-size"
// | "typography.text"
// | "typography.subtext"
// | "typography.button"
// | "typography.h1"
// | "typography.h2"
// | "typography.h3"
// | "typography.h4"
// | "typography.h5"
// | "typography.h6";


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
    | "color.success"
    | "color.success.text"
    | "color.error"
    | "color.error.text"
    | "color.warning"
    | "color.warning.text";



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


export type TypographyRefTypes =
    | "fontsize.1"
    | "fontsize.2"
    | "fontsize.3"
    | "fontsize.4"
    | "fontsize.5"
    | "fontsize.6"
    | "fontsize.7"
    | "fontsize.8"
    | "fontsize.9"
    | "fontsize.10"