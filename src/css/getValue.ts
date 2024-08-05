// import { getTheme } from "../theme"
import { CSSProps } from 'naxcss'
import { ThemeOptions } from '../theme';

const getColor = (color: string, theme: ThemeOptions) => {
    let _color: any = (theme.colors as any)[color]
    return {
        [`${color}`]: _color.main,
        [`${color}.main`]: _color.main,
        [`${color}.light`]: _color.light,
        [`${color}.dark`]: _color.dark,
        [`${color}.text`]: _color.text
    }
}

const getValue = (prop: any, value: string | number, _css: CSSProps, theme: ThemeOptions): any => {
    let important;

    if (typeof value === 'string') {
        const split = value.split("!")
        important = split[1] ? "!important" : ""
        value = split[0]
    }

    if (typeof value === "function") {
        let v = (value as any)(theme)
        v = important ? v + important : v
        return getValue(v, prop, _css, theme) || v
    }

    const values: any = {
        // Typography
        'typography.font-family': theme.typography.fontFamily,
        "fontsize.h1": theme.typography.h1.fontSize,
        "fontsize.h2": theme.typography.h2.fontSize,
        "fontsize.h3": theme.typography.h3.fontSize,
        "fontsize.h4": theme.typography.h4.fontSize,
        "fontsize.h5": theme.typography.h5.fontSize,
        "fontsize.h6": theme.typography.h6.fontSize,
        "fontsize.text": theme.typography.text.fontSize,
        "fontsize.button": theme.typography.button.fontSize,

        // Breakpoints
        "breakpoints.xs": theme.breakpoints.xs,
        "breakpoints.sm": theme.breakpoints.sm,
        "breakpoints.md": theme.breakpoints.md,
        "breakpoints.lg": theme.breakpoints.lg,
        "breakpoints.xl": theme.breakpoints.xl,

        // Colors
        "text": theme.colors.text.main,
        "text.main": theme.colors.text.main,
        "text.light": theme.colors.text.light,
        "text.dark": theme.colors.text.dark,

        "paper": theme.colors.paper.main,
        "paper.main": theme.colors.paper.main,
        "paper.light": theme.colors.paper.light,
        "paper.dark": theme.colors.paper.dark,

        ...getColor("primary", theme),
        ...getColor("secondary", theme),
        ...getColor("info", theme),
        ...getColor("success", theme),
        ...getColor("warning", theme),
        ...getColor("error", theme),
    }

    if (typeof value === "number" && ["shadow", "boxShadow"].includes(prop)) {
        return theme.shadow(value) + (important || "")
    }

    let v = (values[value] || value)
    return important ? v + important : v
}

export default getValue