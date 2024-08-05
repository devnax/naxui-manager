import { CSSProps } from 'naxcss'
import { ThemeOptions } from '../theme';

const getProps = (prop: string, value: string, _css: CSSProps, theme: ThemeOptions) => {
    let important;
    if (typeof value === 'string') {
        const split = value.split("!")
        important = split[1] ? "!important" : ""
        value = split[0]
    }

    const { typography } = theme
    const props: any = {
        'typography': typography,
    }

    if (prop === 'disabled') {
        if ((value as any) === true) {
            const keys: any = Object.keys(_css)
            let _dcss: any = {
                pointerEvents: "none!important",
                cursor: "default!important",
                userSelect: "none!important",
                color: "paper" + "!important",
                opacity: .5
            }
            let isBgcolor = keys["bgcolor"] || keys["bg"] || keys["background"] || keys["backgroundColor"]
            if (isBgcolor && isBgcolor !== 'transparent') {
                _dcss.bgcolor = "paper.light" + "!important"
            }
            return _dcss
        }
        return {}
    }

    // Border
    if (value && typeof value === "number" && ["border", "borderRight", "borderLeft", "borderTop", "borderBottom"].includes(prop as any)) {
        let bgcolor = (_css as any)["bgcolor"]
        const keys: any = Object.keys(_css)
        let c = "paper"
        let isBgcolor = keys["bgcolor"] || keys["bg"] || keys["background"] || keys["backgroundColor"]
        if (isBgcolor && isBgcolor !== 'transparent') {
            const split = bgcolor.split(".")
            if (split.length > 1) {
                isBgcolor = split[0]
            }
            if (["paper", "primary", "secondary", "success", "info", "warning", "error"].includes(isBgcolor)) {
                c = `${isBgcolor}.dark`
            }
        }
        return {
            [`${prop}Width`]: value + 'px' + (important || ""),
            [`${prop}Style`]: "solid",
            [`${prop}Color`]: c
        }
    }

    if (props[prop] && props[prop][value]) {
        let v = props[prop][value]
        if (important) {
            return v + important
        }
        return v
    }
}

export default getProps