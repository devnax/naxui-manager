import { getTheme } from "../theme"
import { CSSProps } from 'naxcss'


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
        if (important) {
            v = v + important
        }
        return getValue(v, prop, _css) || v
    }

    const values: any = {
        'typography.font-family': "var(--typography-font-family)",
        'typography.font-size': "var(--typography-font-family)",

        // Breakpoints
        "breakpoints.xs": "var(--breakpoint-xs)",
        "breakpoints.sm": "var(--breakpoint-sm)",
        "breakpoints.md": "var(--breakpoint-md)",
        "breakpoints.lg": "var(--breakpoint-lg)",
        "breakpoints.xl": "var(--breakpoint-xl)",
        // Colors
        "color.common": "var(--color-common)",
        "color.paper": "var(--color-paper)",
        "color.divider": "var(--color-divider)",
        "color.text": "var(--color-text)",
        "color.subtext": "var(--color-subtext)",
        "color.primary": "var(--color-primary)",
        "color.primary.text": "var(--color-primary.text)",
        "color.secondary": "var(--color-secondary)",
        "color.secondary.text": "var(--color-secondary-text)",
        "color.success": "var(--color-success)",
        "color.success.text": "var(--color-success-text)",
        "color.error": "var(--color-error)",
        "color.error.text": "var(--color-error-text)",
        "color.warning": "var(--color-warning)",
        "color.warning.text": "var(--color-warning-text)",

        // Typography
        "fontsize.1": "var(--fontsize-1)",
        "fontsize.2": "var(--fontsize-2)",
        "fontsize.3": "var(--fontsize-3)",
        "fontsize.4": "var(--fontsize-4)",
        "fontsize.5": "var(--fontsize-5)",
        "fontsize.6": "var(--fontsize-6)",
        "fontsize.7": "var(--fontsize-7)",
        "fontsize.8": "var(--fontsize-8)",

        // Shadow
        "shadow.1": "var(--shadow-1)",
        "shadow.2": "var(--shadow-2)",
        "shadow.3": "var(--shadow-3)",
        "shadow.4": "var(--shadow-4)",
        "shadow.5": "var(--shadow-5)",
        "shadow.6": "var(--shadow-6)",
        "shadow.7": "var(--shadow-7)",
        "shadow.8": "var(--shadow-8)",
        "shadow.9": "var(--shadow-9)",
        "shadow.10": "var(--shadow-10)",
    }

    if (prop === 'shadow' || prop === 'boxShadow') {
        if (theme.shadows[value as any]) {
            return `var(--shadow-${value})` + (important || "")
        }
    }
    let v = (values[value] || value)
    if (important) {
        return v + important
    }
    return v
}

export default getValue