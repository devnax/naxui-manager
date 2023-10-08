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
        if (important) v = v + important
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
        // Colors
        "color.common": "var(--color-common)",
        "color.paper": "var(--color-paper)",
        "color.divider": "var(--color-divider)",
        "color.text": "var(--color-text)",
        "color.subtext": "var(--color-subtext)",
        "color.primary": "var(--color-primary)",
        "color.primary.text": "var(--color-primary-text)",
        "color.secondary": "var(--color-secondary)",
        "color.secondary.text": "var(--color-secondary-text)",
        "color.info": "var(--color-info)",
        "color.info.text": "var(--color-info-text)",
        "color.success": "var(--color-success)",
        "color.success.text": "var(--color-success-text)",
        "color.error": "var(--color-error)",
        "color.error.text": "var(--color-error-text)",
        "color.warning": "var(--color-warning)",
        "color.warning.text": "var(--color-warning-text)",

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

    if ((prop === 'shadow' || prop === 'boxShadow') && typeof value === "number") {
        return theme.shadow(value) + (important || "")
    }
    let v = (values[value] || value)
    if (important) {
        return v + important
    }
    return v
}

export default getValue