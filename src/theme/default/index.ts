import { ThemeOptions } from "../types"
import color from "./color"
import typography from "./typography"
import shadow from "./shadow"

export default {
    name: "default",
    breakpoints: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536
    },
    globalStyle: {},
    color,
    typography,
    shadow,
    interfaces: {},
} as ThemeOptions