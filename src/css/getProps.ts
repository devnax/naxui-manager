import { getTheme } from "../theme"
import { alpha } from '..'
import { CSSProps } from 'naxcss'

// eslint-disable-next-line import/no-anonymous-default-export
export default (prop: string, value: string, _css: CSSProps) => {
    const { typography } = getTheme()
    const props: any = {
        'typography': typography,
    }

    if (prop === 'disabled') {
        if (value) {
            const keys = Object.keys(_css)
            let _dcss: any = {
                pointerEvents: "none",
                cursor: "default",
                userSelect: "none",
                color: alpha("text.primary", 2.6) + "!important",
            }
            if (keys.includes("bgcolor") || keys.includes("bg") || keys.includes("background") || keys.includes("backgroundColor")) {
                _dcss.bgcolor = alpha("text.primary", 1.2) + "!important"
            }
            return _dcss
        } else {
            return {}
        }
    }

    if (props[prop] && props[prop][value]) {
        return props[prop][value]
    }
}