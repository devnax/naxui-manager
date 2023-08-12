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
    const gen = generate()
    const values: any = {
        'divider': alpha("var(--color-text-primary)", .15),
        'font-family': "var(--font-family)",
        ...gen
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