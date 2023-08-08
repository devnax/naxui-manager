import { css } from '../css';
import { useEffect, useRef, useState } from 'react'
import { animationEases } from './useAnimation'
import { AliasesTypes } from '../css/types'
import { CSSProps, formatProp } from 'naxcss';

export interface UseTransitionProps {
    initial?: CSSProps<AliasesTypes>;
    from: CSSProps<AliasesTypes>;
    to: CSSProps<AliasesTypes>;
    ease?: keyof typeof animationEases;
    duration?: number;
    delay?: number;
    onStart?: () => void;
    onFinish?: () => void;
}

const useTransition = ({ from, to, initial, ease, duration, delay, onStart, onFinish }: UseTransitionProps) => {
    const ref: any = useRef()
    let _from: any = from || {}
    let _to: any = to || {}
    let _initial: any = initial || {}
    const [_css, setCss] = useState<any>(_from)
    ease = ease || "bounceEaseOut"
    duration = duration === undefined ? 400 : duration
    delay = delay === undefined ? 0 : delay
    let _ease = animationEases[ease] || animationEases.bounceEaseOut
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

    return [ref, classname]
}

export default useTransition