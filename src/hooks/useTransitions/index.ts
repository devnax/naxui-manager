import { useEffect, useState } from 'react'
import useTransition, { UseTransitionProps } from '../useTransiton'
import * as variants from './variants'
import { CSSProps } from 'naxcss'
import { AliasesTypes } from '../../css/types'

export type UseTransitionsVariantsTypes = keyof typeof variants
export type UseTransitionsVariant = {
    in: {
        from: CSSProps<AliasesTypes>,
        to: CSSProps<AliasesTypes>
    },
    out: {
        from: CSSProps<AliasesTypes>,
        to: CSSProps<AliasesTypes>
    }
}
export type UseTransitionsVariantCallback = (box: { boxHeight: number, boxWidth: number }) => UseTransitionsVariant
export type UseTransitionsProps = Omit<UseTransitionProps, "from" | "to" | "initial">

const useTransitions = (type: UseTransitionsVariantsTypes | UseTransitionsVariantCallback, _in?: boolean, transProps?: UseTransitionsProps) => {
    const [state, setState] = useState({
        boxHeight: 0,
        boxWidth: 0
    });

    _in = _in === undefined ? true : _in
    const [initial, setInitial] = useState(false)
    const [initialCss, setInitialCss] = useState<any>({})
    let variant: UseTransitionsVariant = typeof type === "function" ? type(state) : variants[type](state)
    let _css: any = _in ? variant.in : variant.out;

    useEffect(() => {
        if (ref && ref.current) {
            let h = (ref as any).current.scrollHeight;
            let w = (ref as any).current.scrollWidth
            if (!(h === state.boxHeight && w === state.boxWidth)) {
                setState({
                    ...state,
                    boxHeight: h,
                    boxWidth: w,
                })
            }
        }
    }, [_in])

    let [ref, cls]: any = useTransition({
        ..._css,
        ...transProps,
        initial: initial ? { ...initialCss } : { visibility: "hidden" },
        duration: transProps?.duration ?? 400,
        onStart: () => {
            setInitialCss({})
            transProps?.onStart && transProps.onStart()
        },
        onFinish: () => {
            if (!_in && initial) {
                setInitialCss({ visibility: "hidden" })
            }
            transProps?.onFinish && transProps.onFinish()
        }
    });

    useEffect(() => {
        if (!initial && _in) {
            setInitial(true)
        }
    }, [_in])

    return [ref, cls]
}


export default useTransitions