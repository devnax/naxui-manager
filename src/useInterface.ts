import { useMemo } from "react"
import { useTheme } from "./theme"

const useInterface = <P extends object>(name: string, userPorps: P, defaultProps: P) => {
    const theme = useTheme()
    const _interface = theme.interfaces[name]

    return useMemo(() => {
        if (_interface) {
            defaultProps = _interface<P>({ ...defaultProps, ...userPorps }, theme)
        }
        return [{ ...defaultProps, ...userPorps }, theme]
    }, [userPorps])
}

export default useInterface