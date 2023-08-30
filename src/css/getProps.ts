import { getTheme } from "../theme"
import { alpha } from '..'
import { CSSProps } from 'naxcss'
import getValue from './getValue'

// eslint-disable-next-line import/no-anonymous-default-export
export default (prop: string, value: string, _css: CSSProps) => {
    let important;
    if (typeof value === 'string') {
        const split = value.split("!")
        important = split[1] ? "!important" : ""
        value = split[0]
    }

    const { typography } = getTheme()
    const props: any = {
        'typography': typography,
    }

    // gradient
    if (value !== undefined && (prop === 'color' || prop === 'bgcolor' || prop === 'background' || prop === 'background-color' || prop === 'backgroundColor')) {
        if (value.startsWith("linear") || value.startsWith("radial")) {
            let gradientVals: string[] = value.replace(/linear\(|radial\(|\)/gi, "").split(",")
            let valueMatchWith = ["primary", "secondary", "success", "warning", "error", "grey"]

            // looping all gradients item: (90deg, primary, secondary)
            for (let i = 0; i < gradientVals.length; i++) {
                let val = gradientVals[i].trim()

                // check if the value match with the colors
                let _match = '';
                for (let m of valueMatchWith) {
                    if (val.startsWith(m)) {
                        _match = m
                        let split = val.split(" ") // here value and percentage
                        split[0] = split[0].replace(split[0], getValue(split[0], prop, _css))
                        val = split.join(' ')
                    }
                }
                if (gradientVals.length === 1 && _match) {
                    gradientVals.push(getValue(`${_match}.dark`, prop, _css))
                }
                gradientVals[i] = val
            }

            const gradientType = value.startsWith("linear") ? "linear-gradient" : "radial-gradient"

            if (prop === 'color') {
                return {
                    background: `${gradientType}(${gradientVals.join(',')})`,
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent"
                }
            } else {
                return {
                    backgroundImage: `${gradientType}(${gradientVals.join(',')})`
                }
            }
        }
    }

    if (prop === 'disabled') {
        if ((value as any) === true) {
            const keys = Object.keys(_css)
            let _dcss: any = {
                pointerEvents: "none",
                cursor: "default",
                userSelect: "none",
                color: alpha("color.text", .26) + "!important",
            }
            if (keys.includes("bgcolor") || keys.includes("bg") || keys.includes("background") || keys.includes("backgroundColor")) {
                _dcss.bgcolor = alpha("color.text", .12) + "!important"
            }
            return _dcss
        }
        return {}
    }

    // Border
    if (prop === 'border' && typeof value === "number" && value) {
        return {
            borderWidth: value + 'px' + (important || ""),
            borderStyle: "solid",
            borderColor: "color.divider"
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