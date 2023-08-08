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

export * from './getProps'
export * from './getValue'


export {
    classNames
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


export const alpha = (hex: ColorsRefTypes | string, opacity: number) => {
    return naxcss.alpha(getValue(hex, "", {}) || hex, opacity)
}
