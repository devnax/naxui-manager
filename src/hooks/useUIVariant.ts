import { UseColorVariantColorTypes } from './useColorVariant'
import { alpha } from '..'

export type UseUIVariantTypes = "filled" | "outlined" | "text"

const useUIVariant = (type?: UseUIVariantTypes, color?: UseColorVariantColorTypes, softness?: number): object => {
    color = color || "default"
    type = type || "filled"
    let _color: any = color === 'default' ? "grey.3" : color

    switch (type) {
        case "filled":
            return {
                bgcolor: softness ? alpha(_color, softness) : _color,
                color: color === "default" ? "text.primary" : (softness && softness < .4 ? color : `${color}.text`)
            }
        case "outlined":
            return {
                bgcolor: softness ? alpha(_color, softness) : "transparent",
                border: `1px solid`,
                borderColor: color === "default" ? "grey.4" : _color,
                color: color === "default" ? "text.primary" : (softness && softness > .4 ? `${color}.text` : color)
            }
        case "text":
            return {
                bgcolor: "transparent",
                color: color === "default" ? "text.primary" : color
            }
    }
}

export default useUIVariant