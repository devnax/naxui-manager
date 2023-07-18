import { getTheme } from "../theme"
import { CSSProps, alpha } from 'naxcss'
// eslint-disable-next-line import/no-anonymous-default-export
const getValue = (value: string, prop: string, _css: CSSProps): any => {
    const theme = getTheme()

    if (typeof value === "function") {
        const v = (value as any)(theme)
        return getValue(v, prop, _css) || v
    }

    const values: any = {
        'background.main': "var(--color-background-main)",
        'background.light': "var(--color-background-light)",
        'background.dark': "var(--color-background-dark)",
        'divider': alpha("var(--color-text-primary)", 1.5),

        'text.primary': "var(--color-text-primary)",
        'text.secondary': "var(--color-text-secondary)",

        'primary': "var(--color-primary-main)",
        'primary.main': "var(--color-primary-main)",
        'primary.dark': "var(--color-primary-dark)",
        'primary.light': "var(--color-primary-light)",
        'primary.text': "var(--color-primary-text)",

        'secondary': "var(--color-secondary-main)",
        'secondary.main': "var(--color-secondary-main)",
        'secondary.dark': "var(--color-secondary-dark)",
        'secondary.light': "var(--color-secondary-light)",
        'secondary.text': "var(--color-secondary-text)",

        'success': "var(--color-success-main)",
        'success.main': "var(--color-success-main)",
        'success.dark': "var(--color-success-dark)",
        'success.light': "var(--color-success-light)",
        'success.text': "var(--color-success-text)",

        'error': "var(--color-error-main)",
        'error.main': "var(--color-error-main)",
        'error.dark': "var(--color-error-dark)",
        'error.light': "var(--color-error-light)",
        'error.text': "var(--color-success-text)",

        'warning': "var(--color-warning-main)",
        'warning.main': "var(--color-warning-main)",
        'warning.dark': "var(--color-warning-dark)",
        'warning.light': "var(--color-warning-light)",
        'warning.text': "var(--color-warning-text)",

        'grey.1': "var(--color-grey-1)",
        'grey.2': "var(--color-grey-2)",
        'grey.3': "var(--color-grey-3)",
        'grey.4': "var(--color-grey-4)",
        'grey.5': "var(--color-grey-5)",
        'grey.6': "var(--color-grey-6)",
        'grey.7': "var(--color-grey-7)",
        'grey.8': "var(--color-grey-8)",
        'grey.9': "var(--color-grey-9)",
        'grey.10': "var(--color-grey-10)",

        'font-family': "var(--font-family)",
        'fontsize.1': "var(--fontsize-1)",
        'fontsize.2': "var(--fontsize-2)",
        'fontsize.3': "var(--fontsize-3)",
        'fontsize.4': "var(--fontsize-4)",
        'fontsize.5': "var(--fontsize-5)",
        'fontsize.6': "var(--fontsize-6)",
        'fontsize.7': "var(--fontsize-7)",
        'fontsize.8': "var(--fontsize-8)",

        "xs": "var(--breakpoint-xs)",
        "sm": "var(--breakpoint-sm)",
        "md": "var(--breakpoint-md)",
        "lg": "var(--breakpoint-lg)",
        "xl": "var(--breakpoint-xl)",
    }




    if (prop === 'shadow' || prop === 'boxShadow') {
        if (theme.shadow[value as any]) {
            return `var(--shadow-${value})`
        }
    }
    return values[value] || value
}

export default getValue