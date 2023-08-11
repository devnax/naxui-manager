import useColorVariant, { UseColorVariantColorTypes } from './useColorVariant'

export type UseUIVariantTypes = "filled" | "outlined" | "text"

const useUIVariant = (type?: UseUIVariantTypes, color?: UseColorVariantColorTypes, softness?: boolean): object => {
    color = color || "default"
    type = type || "filled"

    switch (type) {
        case "filled":
            return useColorVariant(color, softness)
        case "outlined":
            const _colors: any = useColorVariant(color)
            return {
                border: `1px solid`,
                borderColor: _colors.bgcolor,
                color: color === 'default' ? _colors.color : _colors.bgcolor,
                ...(softness ? useColorVariant(color, softness) : {})
            }
        case "text":
            return {
                color: color === 'default' ? "text.primary" : color
            }
    }
}

export default useUIVariant