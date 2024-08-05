import { ThemeOptions, ObjectType, ThemeOptionInput } from "./types"
import defaultThemeOption, { lightColorPallete, darkColorPallete } from './theme-defaults'

import * as React from "react"
import { globalCss } from "../css"
import { NAXCSS_CACHE } from "naxcss"
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

export type ThemeProviderProps = {
    children: any
    theme: string;
    resetCss?: boolean;
};

export const getTheme = (theme: string) => ThemeFactory.get(theme)

export const createTheme = (name: string, options: ThemeOptionInput): ThemeOptions => {
    if (!ThemeFactory.has(name)) {
        let theme: any = mergeObject(defaultThemeOption, { ...options, name }) as ThemeOptionInput
        theme.shadow = (num: number) => num ? (`0px 0px 2px -1px rgba(0,0,0,0.15), 0px ${num}px ${num}px 0px rgba(0,0,0,0.10), 0px ${num + 1}px ${num + 1}px -${num + 1}px rgba(0,0,0,0.12)`) : num
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


export const ThemeProvider = ({ children, theme, resetCss }: ThemeProviderProps) => {

    const THEME = ThemeFactory.get(theme) as ThemeOptions
    if (!THEME) {
        throw new Error(`Invalid theme name : ${theme}`);
    }

    resetCss = resetCss ?? true

    React.useMemo(() => {
        NAXCSS_CACHE.forEach((c) => {
            const ele = document.querySelector(`[data-naxcss="${c.classname}"]`)
            ele?.remove()
        })

        NAXCSS_CACHE.clear()
    }, [theme])

    React.useMemo(() => {
        resetCss && globalCss("reset-css", {
            "*": {
                m: 0,
                p: 0,
                outline: "none",
                boxSizing: "border-box",
                verticalAlign: "baseline",
            },
            "html, body": {
                minHeight: "100%"
            },
            "body": {
                "-webkit-font-smoothing": "antialiased",
                fontSize: "fontsize.text",
                fontFamily: "typography.font-family"
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
                overflowWrap: "break-word",
                color: "color.paper.text"
            }
        }, THEME)
    }, [theme])


    return (
        <ThemeContex.Provider value={theme}>
            {children}
        </ThemeContex.Provider>
    )
}
