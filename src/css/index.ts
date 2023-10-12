import {
    GlobalCSSType,
    CSSProps,
    OptionsProps,
    keyframesType,
    classNames
} from 'naxcss'
import * as naxcss from 'naxcss'
import { getTheme, ColorsRefTypes, ThemeOptions, ThemeColorsOptions } from "../theme"
import getValue from "./getValue"
import getProps from "./getProps"
import aliases from "./aliases"
import { AliasesTypes } from './types'
import { globalConfig } from '../'


export {
    classNames,
    getValue,
    getProps
}

export const css_options = (options?: OptionsProps) => {
    const theme = getTheme()
    const globalOption = (globalConfig.get("default_css_option") || {}) as OptionsProps

    return {
        breakpoints: theme.breakpoints,
        classPrefix: 'ui-',
        ...options,
        ...globalOption,
        aliases: {
            ...aliases,
            ...(globalOption.aliases || {})
        },
        getValue: (v: any, p: any, _c: any) => {
            if (options?.getValue) {
                let _val = options?.getValue(p, v, _c)
                if (_val) {
                    return _val
                }
            }
            if (globalOption?.getValue) {
                let _val = globalOption?.getValue(p, v, _c)
                if (_val) {
                    return _val
                }
            }
            return getValue(v, p, _c)
        },
        getProps: (p: any, v: any, _c: any) => {
            if (options?.getProps) {
                let _p = options?.getProps(p, v, _c)
                if (_p) {
                    return _p
                }
            }
            if (globalOption?.getProps) {
                let _p = globalOption?.getProps(p, v, _c)
                if (_p) {
                    return _p
                }
            }
            return getProps(p, v, _c)
        },
    }
}

export const css = (_css: CSSProps<AliasesTypes>, options?: OptionsProps) => {
    console.log(_css);

    return naxcss.css<AliasesTypes>(_css, css_options(options))
}

export const globalCss = (key: string, _gcss: GlobalCSSType<AliasesTypes>, options?: OptionsProps) => {
    return naxcss.globalCss<AliasesTypes>(key, _gcss, css_options(options))
}

export const keyframes = (frames: keyframesType<AliasesTypes>, options?: OptionsProps) => {
    return naxcss.keyframes(frames, css_options(options))
}

export const makeCacheKey = (css_raw: object) => naxcss.makeCacheKey(css_raw)




// Color

export const getColor = (color: keyof ThemeColorsOptions, { colors }: ThemeOptions) => {
    return {
        [`color.${color}`]: (colors as any)[color].main,
        [`color.${color}.main`]: (colors as any)[color].main,
        [`color.${color}.light`]: (colors as any)[color].light,
        [`color.${color}.dark`]: (colors as any)[color].dark,
        [`color.${color}.text`]: (colors as any)[color].text,
        [`color.${color}.subtext`]: (colors as any)[color].subtext,
        [`color.${color}.divider`]: (colors as any)[color].divider,
    }
}

export const adjustColor = (hex: string, factor: number) => {

    hex = hex.replace(/^#/, '')

    let r = parseInt(hex.slice(0, 2), 16)
    let g = parseInt(hex.slice(2, 4), 16)
    let b = parseInt(hex.slice(4, 6), 16)

    r = Math.floor(r * factor)
    g = Math.floor(g * factor)
    b = Math.floor(b * factor)

    r = Math.min(255, Math.max(0, r))
    g = Math.min(255, Math.max(0, g))
    b = Math.min(255, Math.max(0, b))

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const adjustTextContrast = (color: string) => {
    color = color.replace(/^#/, '')
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export const alpha = (color: ColorsRefTypes | string, opacity = 1) => {
    const theme = getTheme()

    let colors: any = {
        ...getColor("paper", theme),
        ...getColor("primary", theme),
        ...getColor("secondary", theme),
        ...getColor("info", theme),
        ...getColor("success", theme),
        ...getColor("warning", theme),
        ...getColor("error", theme),
    }

    let _color = colors[color] || color
    if (typeof opacity !== 'number') return color
    let _opacity = opacity * 100

    if (!_color.startsWith("#")) throw new Error(`color must be hex`)

    let _alpha = (_color + (`0${Math.round((255 / 100) * _opacity).toString(16)}`.slice(-2))).toUpperCase();
    let varname = ("alpha-" + _alpha).replaceAll(/#|\./gi, '-').toLowerCase()

    globalCss("alpha-" + color + "|" + opacity, {
        ":root": {
            [`--${varname}`]: _alpha
        }
    })
    return `var(--${varname})`
};

