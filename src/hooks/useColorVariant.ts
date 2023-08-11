import { alpha } from "..";

export type UseColorVariantColorTypes = "default" | "primary" | "secondary" | "success" | "error" | "warning"

const useColorVariant = (color?: UseColorVariantColorTypes, softness?: boolean | number): object => {
    color = color || "default"
    if (color === 'default') {
        return {
            bgcolor: 'grey.3',
            color: `text.primary`,
            hover: {
                bgcolor: `grey.2`
            }
        }
    }
    if (softness) {
        softness = typeof softness === 'boolean' ? .2 : softness
        return {
            bgcolor: alpha(color, softness),
            color,
            hover: {
                bgcolor: alpha(color, softness - .1),
            }
        }
    }
    return {
        bgcolor: color,
        color: `${color}.text`,
        hover: {
            bgcolor: `${color}.dark`
        }
    }
}


export default useColorVariant