import { useMemo } from "react"
import { mergeObject, useTheme } from "../theme"

const useInterface = <P extends object>(name: string, defaultProps: P, userPorps: P) => {
    const theme = useTheme()
    const _interface = theme.interfaces[name]

    return useMemo(() => {
        if (_interface) {
            defaultProps = _interface<P>(defaultProps, theme)
        }
        return mergeObject(defaultProps, userPorps)
    }, [userPorps])
}

export default useInterface