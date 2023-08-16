import { alpha } from "..";

export type UseColorVariantColorTypes = "default" | "primary" | "secondary" | "success" | "error" | "warning"
export type UseColorVariantReturnType = { main: string, text: string }
const useColorVariant = (color?: UseColorVariantColorTypes, softness?: number): UseColorVariantReturnType | void => {
    if (!color) return
    let _cl: any = color === 'default' ? "gery.3" : color

    if (softness) {
        return {
            main: alpha(_cl, softness),
            text: color === "default" ? "text.primary" : `${color}.text`,
        }
    }

    return {
        main: color,
        text: color === "default" ? "text.primary" : `${color}.text`,
    }
}


export default useColorVariant