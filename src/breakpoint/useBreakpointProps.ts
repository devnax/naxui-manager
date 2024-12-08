import React from "react"
import useBreakpoint from "./useBreakpoint"
import { BreakpointKeys } from "../theme"

export type useBreakpoinPropsType<P> = P | {
   [key in BreakpointKeys]: P
}

const useBreakpoinProps = <P extends object>(props: useBreakpoinPropsType<P>): useBreakpoinPropsType<P> => {
   const bpoint = useBreakpoint()

   let format: any = React.useMemo(() => {
      const _format: any = {
         xs: {},
         sm: {},
         md: {},
         lg: {},
         xl: {}
      }
      for (let prop in props) {
         let val = (props as any)[prop]
         if (typeof val === 'object') {
            for (let breakpoin in val) {
               _format[breakpoin][prop] = (props as any)[prop][breakpoin]
            }
         } else {
            _format.xs[prop] = (props as any)[prop]
         }
      }
      return _format
   }, [JSON.stringify(props), bpoint.value])

   let _props = format.xs || {}
   for (let key of ['sm', 'md', 'lg', 'xl']) {
      if (bpoint.isOrDown(key as any)) {
         _props = {
            ..._props,
            ...format[key]
         }
      }
      if (bpoint.is(key as any)) {
         break
      }
   }
   return _props
}



export default useBreakpoinProps