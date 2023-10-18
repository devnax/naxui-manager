import { ThemeOptions, ObjectType, StateKeys, ThemeOptionInput } from "./types"
import defaultThemeOption, { lightPaperColor } from './theme-defaults'
import { globalCss, alpha, adjustColor, adjustTextContrast } from '../css'
import { NAXCSS_CACHE } from 'naxcss'
import * as React from "react"
export * from './types'
const ThemeFactory = new Map<string, ThemeOptions>()
const DispatchFactory = new Map<string, () => void>()
export const State = new Map<StateKeys, any>()

export const mergeObject = (a: ObjectType, b: ObjectType) => {
    a = { ...a }
    b = { ...b }
    for (const key in b) {
        const v = (b as any)[key]
        if (typeof v === 'object' && !Array.isArray(v)) {
            a[key] = mergeObject(a[key], b[key])
        } else {
            a[key] = v
        }
    }
    return a
}

export const createTheme = (name: string, options: ThemeOptionInput): ThemeOptions => {

    if (!ThemeFactory.has(name)) {

        let theme: any = mergeObject(defaultThemeOption, { ...options, name }) as ThemeOptionInput
        theme.shadow = (num: number) => num ? (`0px 0px 2px -1px rgba(0,0,0,0.15), 0px ${num}px ${num}px 0px rgba(0,0,0,0.10), 0px ${num + 1}px ${num + 1}px -${num + 1}px rgba(0,0,0,0.12)`) : num
        let _colors: any = {}
        for (let colorName in theme.colors) {
            let item = theme.colors[colorName]
            let isObColor = typeof item !== 'string'

            let color = isObColor ? item.main : item
            let tcolor = isObColor ? item.text : adjustTextContrast(color)

            _colors[colorName] = {
                main: color,
                light: adjustColor(color, 1.2),
                dark: adjustColor(color, .8),
                text: tcolor,
                subtext: adjustColor(color, tcolor.toLowerCase() === "#ffffff" ? 5 : .5), // 1.5
                divider: adjustColor(color, .9),
                soft: alpha(color, .09)
            }
        }
        theme.colors = _colors
        ThemeFactory.set(name, theme)
    }

    return ThemeFactory.get(name) as ThemeOptions
}

export const useTheme = (): ThemeOptions => {
    const id = React.useId()
    const [, dispatch] = React.useState(0)

    React.useEffect(() => {
        DispatchFactory.set(id, () => dispatch(Math.random()))
        return () => {
            DispatchFactory.delete(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const name = State.get("current_theme") || "default"
    return ThemeFactory.get(name) as ThemeOptions
}

export const getTheme = (): ThemeOptions => {
    const name = State.get("current_theme") || "default"
    return ThemeFactory.get(name) || createTheme(name, { colors: { paper: lightPaperColor } })
}

export const changeTheme = (name: string) => {
    if (ThemeFactory.has(name)) {
        State.set("current_theme", name)
        const { breakpoints, colors, typography, globalStyle } = getTheme()

        if (typeof window !== 'undefined' && window.document) {
            document.querySelector("style[data-naxcss='theme-vars']")?.remove()
            document.querySelector("style[data-naxcss='reset-css']")?.remove()
            document.querySelector("style[data-naxcss='global-css']")?.remove()
        }
        NAXCSS_CACHE.delete("theme-vars")
        NAXCSS_CACHE.delete("reset-css")
        NAXCSS_CACHE.delete("global-css")

        const cache_keys = Array.from(NAXCSS_CACHE.keys())

        cache_keys.forEach((key: string) => {
            const cache = NAXCSS_CACHE.get(key)
            if (cache && key.startsWith("alpha")) {
                document.querySelector(`style[data-naxcss='${key}']`)?.remove()
                NAXCSS_CACHE.delete(key)
                let _value = key.replace("alpha-", '').split("|")
                alpha(_value[0], parseFloat(_value[1]))
            }
        })

        globalCss("reset-css", {
            "*": {
                m: 0,
                p: 0,
                outline: "none",
                boxSizing: "border-box",
                verticalAlign: "baseline",
            },
            "body": {
                fontFamily: "typography.font-family",
                fontSize: "fontsize.text",
                bgcolor: "color.paper.light",
                color: "color.paper.text",
                fontWeight: 400,
                "-webkit-font-smoothing": "antialiased",
            },
            "img, picture, video, canvas, svg": {
                maxWidth: "100%",
                display: "block"
            },
            "input, button, textarea, select": {
                font: "inherit"
            },
            "table": {
                borderCollapse: "collapse",
                borderSpacing: 0
            },
            "ol, ul ": {
                listStyle: "none"
            },
            "p, h1, h2, h3, h4, h5, h6": {
                overflowWrap: " break-word",
                color: "color.paper.text"
            }
        })

        let root: any = {

            // Typography
            "--typography-font-family": typography.fontFamily,
            "--fontsize-h1": "3.815rem",
            "--fontsize-h2": "3.052rem",
            "--fontsize-h3": "2.441rem",
            "--fontsize-h4": "1.953rem",
            "--fontsize-h5": "1.563rem",
            "--fontsize-h6": "1.25rem",
            "--fontsize-text": "1rem",
            "--fontsize-button": "0.875rem",
            "--fontsize-block": "0.813rem",

            // Breakpoints
            "--breakpoint-xs": breakpoints.xs,
            "--breakpoint-sm": breakpoints.sm,
            "--breakpoint-md": breakpoints.md,
            "--breakpoint-lg": breakpoints.lg,
            "--breakpoint-xl": breakpoints.xl,
        }

        for (let colorName in colors) {
            let color = (colors as any)[colorName]
            root[`--color-${colorName}`] = color.main;
            root[`--color-${colorName}-main`] = color.main;
            root[`--color-${colorName}-light`] = color.light;
            root[`--color-${colorName}-dark`] = color.dark;
            root[`--color-${colorName}-text`] = color.text;
            root[`--color-${colorName}-subtext`] = color.subtext;
            root[`--color-${colorName}-divider`] = color.divider;
            root[`--color-${colorName}-soft`] = color.soft;
        }

        globalCss("theme-vars", { ":root": root });
        (globalStyle && Object.keys(globalStyle).length) && globalCss("global-css", globalStyle)
        DispatchFactory.forEach(d => d())
    }
}
