import { ThemeOptions, ObjectType, StateKeys, ThemeOptionsPartial, ScaleNameTypes } from "./types"
import defaultThemeOption from './default'
import { globalCss } from '../css'
import { NAXCSS_CACHE } from 'naxcss'
import * as React from "react"
import { darkModeColor } from "./default/colors"
import colorGenerate from './colorGenerate'
export * from './types'
const ThemeFactory = new Map<string, ThemeOptions>()
const DispatchFactory = new Map<string, () => void>()
export const State = new Map<StateKeys, any>()

const ratios: { [scale in ScaleNameTypes]: number } = {
    "minor-second": 1.067,
    "major-second": 1.125,
    "Minor-third": 1.200,
    "major-third": 1.250,
    "perfect-fourth": 1.333,
    "augmented-fourth": 1.414,
    "perfect-fifth": 1.500,
    "golden-ratio": 1.618,
}

function createFontScale(baseSize: number, scale: ScaleNameTypes, length = 8) {
    const ratio = ratios[scale]
    const fontSizes = [];
    for (let i = 0; i < length; i++) {
        const size = Math.round(baseSize * Math.pow(ratio, i));
        fontSizes.push(size);
    }
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
        let merged = mergeTheme(defaultThemeOption, { ...options, name }) as ThemeOptions
        if (merged.colors) {
            for (let key in merged.colors) {
                const item = (merged.colors as any)[key]
                if (item.main) {
                    const { lightColor, darkColor, textColor } = colorGenerate(item.main, 15);
                    (merged as any).colors[key].light = item.light || lightColor;
                    (merged as any).colors[key].dark = item.dark || darkColor;
                    (merged as any).colors[key].text = item.text || textColor;
                }
            }
        }
        ThemeFactory.set(name, merged)
        const t = ThemeFactory.get(name) as ThemeOptions
        const sizes = createFontScale(t.typography.scale.baseFontSize, t.typography.scale.name)
        t.typography.scale.sizes = sizes
        ThemeFactory.set(name, t)
    }
    return ThemeFactory.get(name) as ThemeOptions
}

export const modifyTheme = (name: string, options: ThemeOptionsPartial): ThemeOptions => {
    if (ThemeFactory.get(name)) {
        ThemeFactory.set(name, mergeTheme(ThemeFactory.get(name) as ThemeOptions, { ...options, name }) as ThemeOptions)
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
                borderColor: "divider"
            },
            "html, body": {
                height: " 100%"
            },
            "body": {
                fontFamily: "var(--font-family)",
                fontSize: "var(--fontsize-1)",
                bgcolor: "var(--color-background-main)",
                color: "var(--color-text-primary)",
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
            "--font-family": typography.fontFamily,
        }

        for (let key in breakpoints) {
            root[`--breakpoint-${key}`] = (breakpoints as any)[key]
        }

        for (let c_key in colors) {
            let c = (colors as any)[c_key]
            c.main && (root[`--color-${c_key}`] = c.main)
            for (let c_i in c) {
                root[`--color-${c_key}-${c_i}`] = c[c_i]
            }
        }

        Object.keys(shadows).forEach((s_key: any) => root[`--shadow-${s_key}`] = shadows[s_key])
        typography.scale.sizes.forEach((size, i) => root[`--fontsize-${i + 1}`] = size + "px");

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