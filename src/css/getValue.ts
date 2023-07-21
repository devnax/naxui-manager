import { getTheme } from "../theme"
import { CSSProps, alpha } from 'naxcss'

let generated: any;
const generate = () => {
    if (generated) return generated;
    const { breakpoints, colors, typography } = getTheme()
    generated = {}
    for (let key in breakpoints) {
        generated[key] = `var(--breakpoint-${key})`
    }
    for (let c_key in colors) {
        let c = (colors as any)[c_key]
        c.main && (generated[c_key] = `var(--color-${c_key})`)
        for (let c_i in c) {
            generated[`${c_key}.${c_i}`] = `var(--color-${c_key}-${c_i})`
        }
    }
    typography.scale.sizes.forEach((_size, i) => generated[`fontsize.${i + 1}`] = `var(--fontsize-${i + 1})`);
    return generated
}


const getValue = (value: string, prop: string, _css: CSSProps): any => {
    const theme = getTheme()
    if (typeof value === "function") {
        const v = (value as any)(theme)
        return getValue(v, prop, _css) || v
    }
    const gen = generate()
    const values: any = {
        'divider': alpha("var(--color-text-primary)", 1.5),
        'font-family': "var(--font-family)",
        ...gen
    }

    if (value && ["border", "borderTop", "borderBottom", "borderLeft", "borderRight"].includes(prop) && typeof value === 'number') {
        return `${value}px solid`
    }

    if (prop === 'shadow' || prop === 'boxShadow') {
        if (theme.shadows[value as any]) {
            return `var(--shadow-${value})`
        }
    }
    return values[value] || value
}

export default getValue