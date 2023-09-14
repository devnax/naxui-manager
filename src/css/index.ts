import {
    GlobalCSSType,
    CSSProps,
    OptionsProps,
    keyframesType,
    classNames
} from 'naxcss'
import * as naxcss from 'naxcss'
import { getTheme, ColorsRefTypes } from "../theme"
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
    return naxcss.css<AliasesTypes>(_css, css_options(options))
}

export const globalCss = (key: string, _gcss: GlobalCSSType<AliasesTypes>, options?: OptionsProps) => {
    return naxcss.globalCss<AliasesTypes>(key, _gcss, css_options(options))
}

export const keyframes = (frames: keyframesType<AliasesTypes>, options?: OptionsProps) => {
    return naxcss.keyframes(frames, css_options(options))
}

export const makeCacheKey = (css_raw: object) => naxcss.makeCacheKey(css_raw)

export const alpha = (color: ColorsRefTypes | string, opacity = 1) => {
    let _opacity = opacity * 100
    const theme = getTheme()

    let colors: any = {
        "color.common": theme.colors.common,
        "color.paper": theme.colors.paper,
        "color.divider": theme.colors.divider,
        "color.text": theme.colors.text,
        "color.subtext": theme.colors.subtext,
        "color.primary": theme.colors.primary.color,
        "color.primary-text": theme.colors.primary.text,
        "color.secondary": theme.colors.secondary.color,
        "color.secondary-text": theme.colors.secondary.text,
        "color.success": theme.colors.success.color,
        "color.success-text": theme.colors.success.text,
        "color.error": theme.colors.error.color,
        "color.error-text": theme.colors.error.text,
        "color.warning": theme.colors.warning.color,
        "color.warning-text": theme.colors.warning.text,
    }

    let _color = colors[color] || color

    if (_opacity > 100) {
        throw new Error(`opcaity must be 0-1`);
    }
    if (!_color.startsWith("#")) {
        throw new Error(`color must be hex`);
    }

    let _alpha = (_color + (`0${Math.round((255 / 100) * _opacity).toString(16)}`.slice(-2))).toUpperCase();
    if (color === 'color.paper' || color === 'color.common') {
        let varname = ("alpha-" + color + opacity).replaceAll(/#|\./gi, '-').toLowerCase()
        let key = ("alpha-" + color + "|" + opacity)
        globalCss(key, {
            ":root": {
                [`--${varname}`]: _alpha
            }
        })
        _alpha = `var(--${varname})`
    }

    return _alpha
};

