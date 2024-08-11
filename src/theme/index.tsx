import { ThemeOptions, ObjectType, ThemeOptionInput } from "./types"
import defaultThemeOption, { lightColorPallete, darkColorPallete } from './theme-defaults'

import * as React from "react"
import { alpha, globalCss } from "../css"
export * from './types'

const ThemeFactory = new Map<string, ThemeOptions>()
const ThemeContex = React.createContext("light")

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

export const getTheme = (theme: string) => ThemeFactory.get(theme)

export const createTheme = (name: string, options: ThemeOptionInput, darkMode?: boolean): ThemeOptions => {
    if (!ThemeFactory.has(name)) {
        let theme: any = mergeObject(defaultThemeOption, {
            ...(darkMode ? darkColorPallete : {}),
            ...options,
            name
        })

        theme = mergeObject(theme, {
            colors: {
                brand: {
                    alpha: alpha(theme.colors.brand.primary, .15)
                },
                accent: {
                    alpha: alpha(theme.colors.accent.primary, .15)
                },
                info: {
                    alpha: alpha(theme.colors.info.primary, .15)
                },
                success: {
                    alpha: alpha(theme.colors.success.primary, .15)
                },
                warning: {
                    alpha: alpha(theme.colors.warning.primary, .15)
                },
                danger: {
                    alpha: alpha(theme.colors.danger.primary, .15)
                }
            }
        })
        ThemeFactory.set(name, theme)
    } else {
        throw new Error(`theme "${name}" already exists!`);
    }

    return ThemeFactory.get(name) as ThemeOptions
}

export const useTheme = (): ThemeOptions => {
    return ThemeFactory.get(React.useContext(ThemeContex) || "light") as ThemeOptions
}

createTheme("light", {
    colors: lightColorPallete
})

createTheme("dark", {
    colors: darkColorPallete
})

export type ThemeProviderProps = {
    children: React.ReactNode;
    theme: string;
};

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {

    const THEME = ThemeFactory.get(theme) as ThemeOptions
    if (!THEME) throw new Error(`Invalid theme name : ${theme}`)

    React.useMemo(() => {
        // NAXCSS_CACHE.forEach((c) => {
        //     const ele = document.querySelector(`[data-naxcss="${c.classname}"]`)
        //     ele?.remove()
        // })
        // NAXCSS_CACHE.clear()

        !!Object.keys(THEME.globalStyle).length && globalCss(`${theme}-global-css`, THEME.globalStyle, THEME)

        THEME.resetCss && globalCss("reset-css", {
            "*": {
                m: 0,
                p: 0,
                outline: "none",
                boxSizing: "border-box",
                verticalAlign: "baseline",
            },
            "html, body": {
                minHeight: "100%",
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
            "ol, ul": {
                listStyle: "none"
            },
            "a": {
                display: "inline-block"
            },
            "p, h1, h2, h3, h4, h5, h6": {
                overflowWrap: "break-word",
            }
        }, THEME)
    }, [theme])

    return (
        <ThemeContex.Provider value={theme}>

            {children}
        </ThemeContex.Provider>
    )
}
