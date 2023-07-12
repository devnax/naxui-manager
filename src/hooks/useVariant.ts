import { useMemo } from 'react'
import { CSSProps } from 'naxcss'
import { getTheme } from '../theme'
import { alpha } from '..'

export type UseVariantVariants<V> = "text" | "containe" | "outline" | V
export type UseVariantColors = "primary" | "secondary" | "success" | "error" | "warning"
export type UseVariantCallback<V> = (variant: UseVariantVariants<V>, color?: UseVariantColors) => CSSProps | void

const useVariant = <V = "">(variant: UseVariantVariants<V>, color?: UseVariantColors, callback?: UseVariantCallback<V>) => {
    return useMemo(() => {
        const theme = getTheme()
        let tcolor = theme.color[color || "primary"] || theme.color.primary
        let css: any = {
            bgcolor: tcolor.main,
            color: tcolor.text,
            hover: { bgcolor: tcolor.dark }
        }

        switch (variant) {
            case "outline":
                css = {
                    border: 1,
                    borderColor: tcolor.main,
                    color: tcolor.main,
                    hover: {
                        bgcolor: alpha(tcolor.main, .2)
                    }
                }
                break;
            case "text":
                css = {
                    color: tcolor.main,
                    hover: {
                        bgcolor: alpha(tcolor.main, .2)
                    }
                }
                break;
        }
        if (callback) {
            let _css = callback(variant, color)
            if (_css) {
                css = _css
            }
        }
        return css
    }, [variant, color])
}



export default useVariant