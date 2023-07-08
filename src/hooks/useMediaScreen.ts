import { useState } from "react"
import { css_options } from "../css"
import { BreakpointsType } from "../theme"
import useWindowResize from "./useWindowResize"
import isWindow from './isWindow'

const throwError = (n: any) => {
    if (typeof n !== 'number') {
        throw new Error(`Invalid value pass ${n}`);
    }
}

const useMediaScreen = () => {
    const win = isWindow()
    const [windowSize, setWindowSize] = useState(win ? win.innerWidth : 0)
    const _css_option = css_options()
    useWindowResize(() => setWindowSize(window.innerWidth))

    const factory = {
        isDown: (breakpoint: BreakpointsType | number) => {
            if (!win) return false
            let targetSize = (_css_option.breakpoints as any)[breakpoint] || breakpoint
            throwError(targetSize)
            return windowSize < targetSize
        },
        isUp: (breakpoint: BreakpointsType | number) => {
            if (!win) return false
            let targetSize = (_css_option.breakpoints as any)[breakpoint] || breakpoint
            throwError(targetSize)
            return windowSize > targetSize
        },
        is: (breakpoint: BreakpointsType) => {
            switch (['xs', 'sm', 'md', 'lg', 'xl'].indexOf(breakpoint)) {
                case 0:
                    return factory.isDown("sm")
                case 1:
                    return factory.isUp("sm") && factory.isDown("md")
                case 2:
                    return factory.isUp("md") && factory.isDown("lg")
                case 3:
                    return factory.isUp("lg") && factory.isDown("xl")
                case 5:
                    return factory.isUp("xl")
            }
            return false
        }
    }

    return factory
}

export default useMediaScreen