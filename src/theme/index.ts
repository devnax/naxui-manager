import { ThemeOptions, ObjectType, StateKeys, ThemeOptionsPartial, ScaleNameTypes } from "./types"
import defaultThemeOption from './default'
import { globalCss } from '../css'
import { NAXCSS_CACHE } from 'naxcss'
import * as React from "react"
import { darkModeColor } from "./default/colors"
export * from './types'
const ThemeFactory = new Map<string, ThemeOptions>()
const DispatchFactory = new Map<string, () => void>()
export const State = new Map<StateKeys, any>()

const ratios: { [scale in ScaleNameTypes]: number } = {
    "minor-second": 1.067,
    "major-second": 1.125,
    "minor-third": 1.200,
    "major-third": 1.250,
    "perfect-fourth": 1.333,
    "augmented-fourth": 1.414,
    "perfect-fifth": 1.500,
    "golden-ratio": 1.618,
}

function createFontScale(baseSize: number, scale: ScaleNameTypes, length = 8) {
    const ratio = ratios[scale]
    const fontSizes = [baseSize - 2];
    for (let i = 0; i < length; i++) {
        const size = Math.round(baseSize * Math.pow(ratio, i));
        fontSizes.push(size);
    }
    fontSizes.splice(2, 0, baseSize + 2)
    return fontSizes;
}

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
        const sizes = createFontScale(t.typography.fontSize || 16, "minor-third")
        t.typography.sizes = sizes
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
                fontSize: "fontsize.1",
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
            "--typography-font-family": typography.fontFamily,
            "--typography-font-size": typography.fontSize,
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

            // Typography
            "--fontsize-1": typography.sizes[0],
            "--fontsize-2": typography.sizes[1],
            "--fontsize-3": typography.sizes[2],
            "--fontsize-4": typography.sizes[3],
            "--fontsize-5": typography.sizes[4],
            "--fontsize-6": typography.sizes[5],
            "--fontsize-7": typography.sizes[6],
            "--fontsize-8": typography.sizes[7],
            "--fontsize-9": typography.sizes[8],
            "--fontsize-10": typography.sizes[9],

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