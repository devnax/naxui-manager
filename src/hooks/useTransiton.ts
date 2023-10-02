import { css } from '../css';
import { useEffect, useRef, useState } from 'react'
import { animationEases } from './useAnimation'
import { AliasesTypes } from '../css/types'
import { CSSProps, formatProp } from 'naxcss';

export interface UseTransitionProps {
    initial?: CSSProps<AliasesTypes>;
    from: CSSProps<AliasesTypes>;
    to: CSSProps<AliasesTypes>;
    ease?: string;
    easing?: keyof typeof animationEases;
    duration?: number;
    delay?: number;
    onStart?: () => void;
    onFinish?: () => void;
}


const useTransition = ({ from, to, initial, easing, ease, duration, delay, onStart, onFinish }: UseTransitionProps) => {
    const ref: any = useRef()
    let _from: any = from || {}
    let _to: any = to || {}
    let _initial: any = initial || {}
    const [_css, setCss] = useState<any>(_from)
    easing = easing || "easeBounceOut"
    duration = duration ?? 500
    delay = delay ?? 0
    let _ease = ease || animationEases[easing] || animationEases.easeBounceOut
    let trans = ` ${duration}ms ${_ease} ${delay}ms`

    const classname = css({
        ...(_initial || {}),
        ..._css,
        transition: Object.keys(_css || {}).map(k => formatProp(k)).join(trans + ", ") + trans
    })
    useEffect(() => {
        onStart && onStart()

        if (ref.current) {
            (ref.current as any).ontransitionend = (ev: any) => {
                if (ev.propertyName === Object.keys(_css)[0]) {
                    onFinish && onFinish()
                }
            }
        }
        setCss(_to)
    }, [JSON.stringify({ ..._from, ..._to })])
    return [ref, duration ? classname : ""]
}

export default useTransition