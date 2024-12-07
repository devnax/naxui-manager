import { useContext } from "react"
import { BreakpointCtx } from "."
import { css_options } from "../css"
import isWindow from "../isWindow"
import { BreakpointKeys } from "../theme"

const useBreakpoint = () => {
   const val = useContext(BreakpointCtx)
   const { breakpoints } = css_options()
   const isWin = isWindow()
   const o = {
      value: val,
      is: (key: BreakpointKeys) => val === key,
      isDown: (key: BreakpointKeys) => {
         if (isWin) {
            return window.innerWidth > breakpoints[key]
         }
         return false
      },
      isUp: (key: BreakpointKeys) => {
         if (isWin) {
            return window.innerWidth < breakpoints[key]
         }
         return false
      },
      isOrDown: (key: BreakpointKeys) => o.is(key) || o.isDown(key),
      isOrUp: (key: BreakpointKeys) => o.is(key) || o.isUp(key)
   }
   return o
}

export default useBreakpoint
