import { CSSProps } from 'naxcss'

const getProps = (prop: string, value: string, _css: CSSProps) => {
    let important;
    if (typeof value === 'string') {
        const split = value.split("!")
        important = split[1] ? "!important" : ""
        value = split[0]
    }

    if (prop === 'disabled') {
        if ((value as any) === true) {
            const keys: any = Object.keys(_css)
            let _dcss: any = {
                pointerEvents: "none!important",
                cursor: "default!important",
                userSelect: "none!important",
                color: "text.secondary" + "!important",
                opacity: .5
            }
            let isBgcolor = keys["bgcolor"] || keys["bg"] || keys["background"] || keys["backgroundColor"]
            if (isBgcolor && isBgcolor !== 'transparent') {
                _dcss.bgcolor = "background.secondary" + "!important"
            }
            return _dcss
        }
        return {}
    }

    if (value && typeof value === "number" && ["border", "borderRight", "borderLeft", "borderTop", "borderBottom"].includes(prop as any)) {
        return {
            [`${prop}Width`]: value + 'px' + (important || ""),
            [`${prop}Style`]: "solid",
        }
    }
}

export default getProps