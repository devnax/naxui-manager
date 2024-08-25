import { ThemeOptions, ObjectType, ThemeOptionInput, ThemeColor } from "./types"
import defaultThemeOption, { lightColorPallete, darkColorPallete } from './theme-defaults'

import * as React from "react"
import { alpha, globalCss } from "../css"
import Tag, { TagComponenntType, TagProps } from "../Tag"
export * from './types'

const ThemeFactory = new Map<string, ThemeOptions>()
const ThemeContex = React.createContext("light")

export const mergeObject = (a: ObjectType, b: ObjectType) => {
    a = { ...a }
    b = { ...b }
    for (const key in b) {
        const v = (b as any)[key]
        if (typeof v === 'object' && !Array.isArray(v) && !React.isValidElement(v)) {
            a[key] = mergeObject(a[key], b[key])
        } else {
            a[key] = v
        }
    }
    return a
}

export const getTheme = (theme: string) => ThemeFactory.get(theme)

const createColor = (theme: ThemeOptions, name: keyof ThemeColor) => {
    let color = theme.colors[name]
    let { primary, secondary } = color
    let text = (color as any).text || theme.colors.text.primary
    let _alpha = alpha(primary, .1)

    const isBag = (a: any, b: any) => name === "background" ? a : b

    return {
        alpha: _alpha,
        template: {
            outline: {
                bgcolor: "transparent",
                color: isBag(text, primary),
                border: 1,
                borderColor: isBag(alpha(secondary, .6), alpha(primary, .4)),
                hover: {
                    bgcolor: isBag(secondary, _alpha),
                    color: isBag(text, primary),
                }
            },
            fill: {
                bgcolor: isBag(secondary, primary),
                color: text,
                hover: {
                    bgcolor: isBag(alpha(secondary, .8), secondary),
                    color: text,
                }
            },
            text: {
                bgcolor: "transparent",
                color: isBag(text, primary),
                hover: {
                    bgcolor: isBag(alpha(secondary, .8), alpha(primary, .18)),
                    color: isBag(text, primary),
                }
            },
            alpha: {
                bgcolor: isBag(alpha(secondary, .5), alpha(primary, .1)),
                color: isBag(text, primary),
                hover: {
                    bgcolor: isBag(alpha(secondary, .8), alpha(primary, .18)),
                    color: isBag(text, primary),
                }
            }
        }
    }
}

export const createTheme = (name: string, options: ThemeOptionInput, darkMode?: boolean): ThemeOptions => {
    if (!ThemeFactory.has(name)) {
        let theme: any = mergeObject(defaultThemeOption, {
            ...(darkMode ? darkColorPallete : {}),
            ...options,
            name
        })

        theme = mergeObject(theme, {
            colors: {
                background: createColor(theme, "background"),
                brand: createColor(theme, "brand"),
                accent: createColor(theme, "accent"),
                info: createColor(theme, "info"),
                success: createColor(theme, "success"),
                warning: createColor(theme, "warning"),
                danger: createColor(theme, "danger")
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

export type ThemeProviderProps<T extends TagComponenntType = 'div'> = TagProps<T> & {
    theme: string;
    resetCss?: boolean;
}

export const ThemeProvider = ({ children, theme, resetCss, ...props }: ThemeProviderProps) => {

    const THEME = ThemeFactory.get(theme) as ThemeOptions
    if (!THEME) throw new Error(`Invalid theme name provided: ${theme}`)

    React.useMemo(() => {

        if (!!Object.keys(THEME.globalStyle).length) {
            globalCss(`${theme}-global-css`, THEME.globalStyle, THEME)
        }

        resetCss && globalCss("reset-css", {
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
            <Tag
                minHeight="100%"
                bgcolor={THEME.colors.background.primary}
                fontFamily={THEME.typography.fontFamily}
                fontSize={THEME.typography.text.fontSize}
                fontWeight={THEME.typography.text.fontWeight}
                lineHeight={THEME.typography.text.lineHeight}
                {...props}
                baseClass={`${theme}-theme-provider`}
                direction={THEME.rtl ? "rtl" : "ltr"}
            >
                {children}
            </Tag>
        </ThemeContex.Provider>
    )
}
