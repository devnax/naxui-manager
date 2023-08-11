import useVariants from './useVariants'

export type UseCornerVariantTypes = "square" | "rounded" | "circle"

const useCornerVariant = (type?: UseCornerVariantTypes): object => {
    return useVariants(type || "square", {
        square: {
            radius: 0
        },
        rounded: {
            radius: 1.5
        },
        circle: {
            radius: 100
        }
    })
}

export default useCornerVariant