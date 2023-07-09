import React, { useMemo } from 'react'
import { globalCss } from './css'
import { useTheme } from './theme'
import { NAXCSS_CACHE, OptionsProps } from 'naxcss'
import { globalConfig } from './'

const HandleTheme = () => {
    const theme = useTheme()
    useMemo(() => {

        let breakpoints: any = {}
        for (let key in theme.breakpoints) {
            breakpoints[`--breakpoint-${key}`] = (theme.breakpoints as any)[key]
        }

        const typographyVars = (key: string) => {
            return {
                [`--typography-${key}-font-family`]: (theme.typography as any)[key].fontFamily || "var(--font-family)",
                [`--typography-${key}-font-size`]: (theme.typography as any)[key].fontSize,
                [`--typography-${key}-color`]: (theme.typography as any)[key].color,
            }
        }
        if (typeof window !== 'undefined' && window.document) {
            document.querySelector("style[data-naxcss='theme-manager']")?.remove()
        }
        NAXCSS_CACHE.delete("theme-manager")

        const defaultFontFamily = globalConfig.get("defaultFontFamily")

        globalCss("theme-manager", {
            ...theme.globalStyle,
            "body": {
                margin: 0,
                padding: 0,
                listStyle: "none",
                outline: "none",
                fontFamily: "var(--font-family)",
                fontSize: "var(--fontsize-1)",
                bgcolor: "var(--color-background-main)",
                ...((theme.globalStyle as any)["body"] || {})
            },
            ":root": {
                "--font-family": defaultFontFamily || '"Inter","Helvetica","Arial",sans-serif',

                // Color
                "--color-background": theme.color.background.main,
                "--color-background-main": theme.color.background.main,
                "--color-background-light": theme.color.background.light,
                "--color-background-dark": theme.color.background.dark,
                "--color-primary": theme.color.primary.main,
                "--color-primary-main": theme.color.primary.main,
                "--color-primary-light": theme.color.primary.light,
                "--color-primary-dark": theme.color.primary.dark,
                "--color-primary-text": theme.color.primary.text,
                "--color-secondary": theme.color.secondary.main,
                "--color-secondary-main": theme.color.secondary.main,
                "--color-secondary-light": theme.color.secondary.light,
                "--color-secondary-dark": theme.color.secondary.dark,
                "--color-secondary-text": theme.color.secondary.text,
                "--color-success": theme.color.success.main,
                "--color-success-main": theme.color.success.main,
                "--color-success-light": theme.color.success.light,
                "--color-success-dark": theme.color.success.dark,
                "--color-success-text": theme.color.success.text,
                "--color-error": theme.color.error.main,
                "--color-error-main": theme.color.error.main,
                "--color-error-light": theme.color.error.light,
                "--color-error-dark": theme.color.error.dark,
                "--color-error-text": theme.color.error.text,
                "--color-warning": theme.color.warning.main,
                "--color-warning-main": theme.color.warning.main,
                "--color-warning-light": theme.color.warning.light,
                "--color-warning-dark": theme.color.warning.dark,
                "--color-warning-text": theme.color.warning.text,
                "--color-text": theme.color.text.primary,
                "--color-text-primary": theme.color.text.primary,
                "--color-text-secondary": theme.color.text.secondary,
                "--color-text-disabled": theme.color.text.disabled,
                "--color-grey-1": theme.color.grey[1],
                "--color-grey-2": theme.color.grey[2],
                "--color-grey-3": theme.color.grey[3],
                "--color-grey-4": theme.color.grey[4],
                "--color-grey-5": theme.color.grey[5],
                "--color-grey-6": theme.color.grey[6],
                "--color-grey-7": theme.color.grey[7],
                "--color-grey-8": theme.color.grey[8],
                "--color-grey-9": theme.color.grey[9],
                "--color-grey-10": theme.color.grey[10],
                ...breakpoints,

                // Shadows
                "--shadow-1": theme.shadow[1],
                "--shadow-2": theme.shadow[2],
                "--shadow-3": theme.shadow[3],
                "--shadow-4": theme.shadow[4],
                "--shadow-5": theme.shadow[5],
                "--shadow-6": theme.shadow[6],
                "--shadow-7": theme.shadow[7],
                "--shadow-8": theme.shadow[8],
                "--shadow-9": theme.shadow[9],
                "--shadow-10": theme.shadow[10],

                // FontSize
                '--fontsize-1': theme.typography.scale.sizes[0] + "px",
                '--fontsize-2': theme.typography.scale.sizes[1] + "px",
                '--fontsize-3': theme.typography.scale.sizes[2] + "px",
                '--fontsize-4': theme.typography.scale.sizes[3] + "px",
                '--fontsize-5': theme.typography.scale.sizes[4] + "px",
                '--fontsize-6': theme.typography.scale.sizes[5] + "px",
                '--fontsize-7': theme.typography.scale.sizes[6] + "px",
                '--fontsize-8': theme.typography.scale.sizes[7] + "px",

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

                ...((theme.globalStyle as any)[":root"] || {})
            }
        })
    }, [theme.name])
    return <></>
}


type Props = {
    children: any;
    css_option?: OptionsProps;
    defaultFontFamily?: string;
}

const ThemeProvider = ({ children, css_option, defaultFontFamily }: Props) => {
    useMemo(() => {
        css_option && globalConfig.set("default_css_option", css_option)
        defaultFontFamily && globalConfig.set("defaultFontFamily", defaultFontFamily)
    }, [css_option, defaultFontFamily])
    return <>
        <HandleTheme />
        {children}
    </>
}

export default ThemeProvider