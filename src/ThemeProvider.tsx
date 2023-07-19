import * as React from 'react'
import { globalCss } from './css'
import { useTheme, changeTheme } from './theme'
import { NAXCSS_CACHE, OptionsProps } from 'naxcss'
import { globalConfig } from './'

const HandleTheme = () => {
    const { name, breakpoints, color, typography, shadow, globalStyle } = useTheme()

    React.useMemo(() => {

        let _breakpoints: any = {}
        for (let key in breakpoints) {
            _breakpoints[`--breakpoint-${key}`] = (breakpoints as any)[key]
        }

        const typographyVars = (key: string) => {
            return {
                [`--typography-${key}-font-family`]: (typography as any)[key].fontFamily || "var(--font-family)",
                [`--typography-${key}-font-size`]: (typography as any)[key].fontSize,
                [`--typography-${key}-color`]: (typography as any)[key].color,
            }
        }
        if (typeof window !== 'undefined' && window.document) {
            document.querySelector("style[data-naxcss='theme-manager']")?.remove()
        }
        NAXCSS_CACHE.delete("theme-manager")

        const defaultFontFamily = globalConfig.get("defaultFontFamily")

        globalCss("theme-manager", {
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
                fontFamily: "var(--font-family)",
                fontSize: "var(--fontsize-1)",
                bgcolor: "var(--color-background-main)",
                color: "var(--color-text-primary)",
                fontWeight: "normal",
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
            },

            ...globalStyle,

            ":root": {
                "--font-family": defaultFontFamily || '"Inter","Helvetica","Arial",sans-serif',

                // Color
                "--color-background": color.background.main,
                "--color-background-main": color.background.main,
                "--color-background-light": color.background.light,
                "--color-background-dark": color.background.dark,
                "--color-primary": color.primary.main,
                "--color-primary-main": color.primary.main,
                "--color-primary-light": color.primary.light,
                "--color-primary-dark": color.primary.dark,
                "--color-primary-text": color.primary.text,
                "--color-secondary": color.secondary.main,
                "--color-secondary-main": color.secondary.main,
                "--color-secondary-light": color.secondary.light,
                "--color-secondary-dark": color.secondary.dark,
                "--color-secondary-text": color.secondary.text,
                "--color-success": color.success.main,
                "--color-success-main": color.success.main,
                "--color-success-light": color.success.light,
                "--color-success-dark": color.success.dark,
                "--color-success-text": color.success.text,
                "--color-error": color.error.main,
                "--color-error-main": color.error.main,
                "--color-error-light": color.error.light,
                "--color-error-dark": color.error.dark,
                "--color-error-text": color.error.text,
                "--color-warning": color.warning.main,
                "--color-warning-main": color.warning.main,
                "--color-warning-light": color.warning.light,
                "--color-warning-dark": color.warning.dark,
                "--color-warning-text": color.warning.text,
                "--color-text": color.text.primary,
                "--color-text-primary": color.text.primary,
                "--color-text-secondary": color.text.secondary,
                "--color-grey-1": color.grey[1],
                "--color-grey-2": color.grey[2],
                "--color-grey-3": color.grey[3],
                "--color-grey-4": color.grey[4],
                "--color-grey-5": color.grey[5],
                "--color-grey-6": color.grey[6],
                "--color-grey-7": color.grey[7],
                "--color-grey-8": color.grey[8],
                "--color-grey-9": color.grey[9],
                "--color-grey-10": color.grey[10],
                ..._breakpoints,

                // Shadows
                "--shadow-1": shadow[1],
                "--shadow-2": shadow[2],
                "--shadow-3": shadow[3],
                "--shadow-4": shadow[4],
                "--shadow-5": shadow[5],
                "--shadow-6": shadow[6],
                "--shadow-7": shadow[7],
                "--shadow-8": shadow[8],
                "--shadow-9": shadow[9],
                "--shadow-10": shadow[10],

                // FontSize
                '--fontsize-1': typography.scale.sizes[0] + "px",
                '--fontsize-2': typography.scale.sizes[1] + "px",
                '--fontsize-3': typography.scale.sizes[2] + "px",
                '--fontsize-4': typography.scale.sizes[3] + "px",
                '--fontsize-5': typography.scale.sizes[4] + "px",
                '--fontsize-6': typography.scale.sizes[5] + "px",
                '--fontsize-7': typography.scale.sizes[6] + "px",
                '--fontsize-8': typography.scale.sizes[7] + "px",

                // Typography
                ...typographyVars("text"),
                ...typographyVars("subtext"),
                ...typographyVars("button"),
                ...typographyVars("h1"),
                ...typographyVars("h2"),
                ...typographyVars("h3"),
                ...typographyVars("h4"),
                ...typographyVars("h5"),
                ...typographyVars("h6"),

                ...((globalStyle as any)[":root"] || {})
            }
        })
    }, [name])
    return <></>
}


type Props = {
    children: any;
    css_option?: OptionsProps;
    defaultFontFamily?: string;
    defaultTheme?: string;
}

const ThemeProvider = ({ children, css_option, defaultFontFamily, defaultTheme }: Props) => {
    React.useMemo(() => {
        css_option && globalConfig.set("default_css_option", css_option)
        defaultFontFamily && globalConfig.set("defaultFontFamily", defaultFontFamily)
        defaultTheme && changeTheme(defaultTheme)
    }, [css_option, defaultFontFamily, defaultTheme])
    return <>
        <HandleTheme />
        {children}
    </>
}

export default ThemeProvider