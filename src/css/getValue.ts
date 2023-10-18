import { getTheme } from "../theme"
import { CSSProps } from 'naxcss'

const getColor = (color: string) => {
    return {
        [`color.${color}`]: `var(--color-${color}-main)`,
        [`color.${color}.main`]: `var(--color-${color}-main)`,
        [`color.${color}.light`]: `var(--color-${color}-light)`,
        [`color.${color}.dark`]: `var(--color-${color}-dark)`,
        [`color.${color}.text`]: `var(--color-${color}-text)`,
        [`color.${color}.subtext`]: `var(--color-${color}-subtext)`,
        [`color.${color}.divider`]: `var(--color-${color}-divider)`,
        [`color.${color}.soft`]: `var(--color-${color}-soft)`,
    }
}
const getValue = (value: string, prop: string, _css: CSSProps): any => {
    let important;
    if (typeof value === 'string') {
        const split = value.split("!")
        important = split[1] ? "!important" : ""
        value = split[0]
    }

    const theme = getTheme()
    if (typeof value === "function") {
        let v = (value as any)(theme)
        v = important ? v + important : v
        return getValue(v, prop, _css) || v
    }

    const values: any = {
        'typography.font-family': "var(--typography-font-family)",

        // Breakpoints
        "breakpoints.xs": "var(--breakpoint-xs)",
        "breakpoints.sm": "var(--breakpoint-sm)",
        "breakpoints.md": "var(--breakpoint-md)",
        "breakpoints.lg": "var(--breakpoint-lg)",
        "breakpoints.xl": "var(--breakpoint-xl)",

        // Typography
        "fontsize.h1": "var(--fontsize-h1)",
        "fontsize.h2": "var(--fontsize-h2)",
        "fontsize.h3": "var(--fontsize-h3)",
        "fontsize.h4": "var(--fontsize-h4)",
        "fontsize.h5": "var(--fontsize-h5)",
        "fontsize.h6": "var(--fontsize-h6)",
        "fontsize.text": "var(--fontsize-text)",
        "fontsize.button": "var(--fontsize-button)",
        "fontsize.block": "var(--fontsize-block)",

        // Colors
        ...getColor("paper"),
        ...getColor("primary"),
        ...getColor("secondary"),
        ...getColor("info"),
        ...getColor("success"),
        ...getColor("warning"),
        ...getColor("error"),

    }

    if (typeof value === "number" && ["shadow", "boxShadow"].includes(prop)) {
        return theme.shadow(value) + (important || "")
    }
    let v = (values[value] || value)
    return important ? v + important : v
}

export default getValue