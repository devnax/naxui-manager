import { ThemeOptions, ObjectType, StateKeys, ThemeOptionsPartial } from "./types"
import defaultThemeOption from './default'
import { globalCss } from '../css'
import { NAXCSS_CACHE } from 'naxcss'
import * as React from "react"
import { darkModeColor } from "./default/colors"
export * from './types'
const ThemeFactory = new Map<string, ThemeOptions>()
const DispatchFactory = new Map<string, () => void>()
export const State = new Map<StateKeys, any>()

export const mergeTheme = (a: ObjectType, b: ObjectType) => {
    a = { ...a }
    b = { ...b }
    for (const key in b) {
        const v = (b as any)[key]
        if (typeof v === 'object' && !Array.isArray(v)) {
            a[key] = mergeTheme(a[key], b[key])
        } else {
            a[key] = v
        }
    }
    return a
}


export const createTheme = (name: string, options: ThemeOptionsPartial): ThemeOptions => {
    if (!ThemeFactory.get(name)) {
        let theme: any = mergeTheme(defaultThemeOption, { ...options, name }) as ThemeOptions
        ThemeFactory.set(name, theme)
        const t = ThemeFactory.get(name) as ThemeOptions
        ThemeFactory.set(name, t)
    }
    return ThemeFactory.get(name) as ThemeOptions
}

export const modifyTheme = (name: string, options: ThemeOptionsPartial) => {
    if (ThemeFactory.has(name)) {
        ThemeFactory.set(name, mergeTheme(ThemeFactory.get(name) as ThemeOptions, { ...options, name }) as ThemeOptions)
    }
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
    return ThemeFactory.get(name) || createTheme("default", defaultThemeOption as any) as ThemeOptions
}

export const getTheme = (): ThemeOptions => {
    const name = State.get("current_theme") || "default"
    return ThemeFactory.get(name) || createTheme("default", defaultThemeOption as any)
}

export const changeTheme = (name: string) => {
    if (ThemeFactory.has(name)) {
        State.set("current_theme", name)
        const { breakpoints, colors, typography, shadows, globalStyle } = getTheme()

        if (typeof window !== 'undefined' && window.document) {
            document.querySelector("style[data-naxcss='theme-vars']")?.remove()
            document.querySelector("style[data-naxcss='reset-css']")?.remove()
            document.querySelector("style[data-naxcss='global-css']")?.remove()
        }
        NAXCSS_CACHE.delete("theme-vars")
        NAXCSS_CACHE.delete("reset-css")
        NAXCSS_CACHE.delete("global-css")

        globalCss("reset-css", {
            "*": {
                m: 0,
                padding: 0,
                outline: "none",
                boxSizing: "border-box",
                verticalAlign: "baseline",
            },
            "html, body": {
                height: " 100%"
            },
            "body": {
                fontFamily: "typography.font-family",
                fontSize: "fontsize.text",
                bgcolor: "color.common",
                color: "color.text",
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
                overflowWrap: " break-word"
            }
        })

        let root: any = {

            // Typography
            "--typography-font-family": typography.fontFamily,
            "--fontsize-h1": "5.61rem",
            "--fontsize-h2": "4.209rem",
            "--fontsize-h3": "3.157rem",
            "--fontsize-h4": "2.369rem",
            "--fontsize-h5": "1.777rem",
            "--fontsize-h6": "1.333rem",
            "--fontsize-text": "1rem",
            "--fontsize-button": "0.85rem",
            "--fontsize-small": "0.75rem",

            // Breakpoints
            "--breakpoint-xs": breakpoints.xs,
            "--breakpoint-sm": breakpoints.sm,
            "--breakpoint-md": breakpoints.md,
            "--breakpoint-lg": breakpoints.lg,
            "--breakpoint-xl": breakpoints.xl,
            // Colors
            "--color-common": colors.common,
            "--color-paper": colors.paper,
            "--color-divider": colors.divider,
            "--color-text": colors.text,
            "--color-subtext": colors.subtext,
            "--color-primary": colors.primary.color,
            "--color-primary-text": colors.primary.text,
            "--color-secondary": colors.secondary.color,
            "--color-secondary-text": colors.secondary.text,
            "--color-success": colors.success.color,
            "--color-success-text": colors.success.text,
            "--color-error": colors.error.color,
            "--color-error-text": colors.error.text,
            "--color-warning": colors.warning.color,
            "--color-warning-text": colors.warning.text,

            // Shadow
            "--shadow-1": shadows[1],
            "--shadow-2": shadows[2],
            "--shadow-3": shadows[3],
            "--shadow-4": shadows[4],
            "--shadow-5": shadows[5],
            "--shadow-6": shadows[6],
            "--shadow-7": shadows[7],
            "--shadow-8": shadows[8],
            "--shadow-9": shadows[9],
            "--shadow-10": shadows[10],
        }
        globalCss("theme-vars", { ":root": root });
        (globalStyle && Object.keys(globalStyle).length) && globalCss("global-css", globalStyle)
        DispatchFactory.forEach(d => d())
    }
}

createTheme('default', defaultThemeOption as any)
createTheme('default-dark', {
    colors: {
        ...darkModeColor
    }
})