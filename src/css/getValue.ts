// import { getTheme } from "../theme"
import { CSSProps } from 'naxcss'
import { ThemeOptions } from '../theme';

const getColor = (color: string, theme: ThemeOptions) => {
    let _color: any = (theme.colors as any)[color]
    return {
        [`${color}`]: _color.primary,
        [`${color}.primary`]: _color.primary,
        [`${color}.secondary`]: _color.secondary,
        [`${color}.text`]: _color.text,
        [`${color}.alpha`]: _color.alpha
    }
}

const withImportant = (important: any, value: any) => important ? value + important : value

const getValue = (prop: any, value: string | number, _css: CSSProps, theme: ThemeOptions): any => {
    let important;

    if (typeof value === 'string') {
        const split = value.split("!")
        important = split[1] ? "!important" : ""
        value = split[0]
    }

    if (typeof value === "function") {
        let v = (value as any)(theme)
        return getValue(v, prop, _css, theme) || withImportant(important, v)
    }

    const values: any = {
        "text": theme.colors.text.primary,
        "text.primary": theme.colors.text.primary,
        "text.secondary": theme.colors.text.secondary,

        "background": theme.colors.background.primary,
        "background.primary": theme.colors.background.primary,
        "background.secondary": theme.colors.background.secondary,
        "background.alpha": theme.colors.background.alpha,

        ...getColor("brand", theme),
        ...getColor("accent", theme),

        ...getColor("info", theme),
        ...getColor("success", theme),
        ...getColor("warning", theme),
        ...getColor("danger", theme),
    }

    const breakpoints: any = {
        "xs": theme.breakpoints.xs,
        "sm": theme.breakpoints.sm,
        "md": theme.breakpoints.md,
        "lg": theme.breakpoints.lg,
        "xl": theme.breakpoints.xl
    }

    let fontsizes: any = {
        "h1": theme.typography.h1.fontSize,
        "h2": theme.typography.h2.fontSize,
        "h3": theme.typography.h3.fontSize,
        "h4": theme.typography.h4.fontSize,
        "h5": theme.typography.h5.fontSize,
        "h6": theme.typography.h6.fontSize,
        "text": theme.typography.text.fontSize,
        "button": theme.typography.button.fontSize,
        "small": theme.typography.small.fontSize
    }

    let lineHeights: any = {
        "h1": theme.typography.h1.lineHeight,
        "h2": theme.typography.h2.lineHeight,
        "h3": theme.typography.h3.lineHeight,
        "h4": theme.typography.h4.lineHeight,
        "h5": theme.typography.h5.lineHeight,
        "h6": theme.typography.h6.lineHeight,
        "text": theme.typography.text.lineHeight,
        "button": theme.typography.button.lineHeight,
        "small": theme.typography.small.lineHeight
    }

    let fontWeights: any = {
        "h1": theme.typography.h1.fontWeight,
        "h2": theme.typography.h2.fontWeight,
        "h3": theme.typography.h3.fontWeight,
        "h4": theme.typography.h4.fontWeight,
        "h5": theme.typography.h5.fontWeight,
        "h6": theme.typography.h6.fontWeight,
        "text": theme.typography.text.fontWeight,
        "button": theme.typography.button.fontWeight,
        "small": theme.typography.small.fontWeight
    }

    if (['width', 'maxWidth', 'minWidth', 'max-width', 'min-width'].includes(prop)) {
        return withImportant(important, breakpoints[value] || value)
    } else if (['fontFamily', 'font-family'].includes(prop) && value === 'default') {
        return withImportant(important, theme.typography.fontFamily)
    } if (['fontWeight', 'font-weight'].includes(prop) && typeof value === 'string' && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text', 'button', 'small'].includes(value)) {
        return withImportant(important, fontWeights[value] || value)
    } else if (['lineHeight', 'line-height'].includes(prop) && typeof value === 'string' && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text', 'button', 'small'].includes(value)) {
        return withImportant(important, lineHeights[value] || value)
    } else if (['fontSize', 'font-size'].includes(prop) && typeof value === 'string') {
        return withImportant(important, fontsizes[value] || value)
    } else if (typeof value === "number" && ["shadow", "boxShadow"].includes(prop)) {
        return withImportant(important, theme.shadow(value))
    }

    return withImportant(important, values[value] || value)
}

export default getValue