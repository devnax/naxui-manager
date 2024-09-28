import { css } from '../../css';
import { useId, useState, useEffect } from 'react'
import { animationEases } from '../useAnimation'
import { AliasesTypes } from '../../css/types'
import { CSSProps, formatProp } from 'naxcss';
import { useTheme } from '../../theme';
import * as predefinedVariants from './variants'
export type UseTransitionVariantsTypes = keyof typeof predefinedVariants

export interface UseTransitionProps {
    variants: {
        from: CSSProps<AliasesTypes>;
        to: CSSProps<AliasesTypes>;
    } | UseTransitionVariantsTypes;
    ease?: string;
    easing?: keyof typeof animationEases;
    duration?: number;
    delay?: number;
    onStart?: (type: "startOpen" | "startClose") => void;
    onFinish?: (type: "finishedOpen" | "finishedClose") => void;
}

export type UseTransitionElementProps = {
    height: number;
    width: number;
    rect: DOMRect | null
}

const useTransition = (open: boolean, props: UseTransitionProps | ((element: UseTransitionElementProps) => UseTransitionProps)) => {

    const id = "transition-" + useId().replace(/\:/gi, "")
    const theme = useTheme()
    const [initial, setInitial] = useState(false)

    const [element, setElement] = useState<UseTransitionElementProps>({
        height: 0,
        width: 0,
        rect: null
    });

    props = typeof props === "function" ? props(element as any) : props

    let { variants, duration, delay, ease, easing, onFinish, onStart } = props as UseTransitionProps
    let _ease = ease || (animationEases as any)[easing as any] || animationEases.easeBounceOut

    if (typeof variants === 'string') {
        variants = (predefinedVariants as any)[variants](element)
    }

    const [_css, setCss] = useState<any>({ ...(variants as any).to, visibility: "hidden" })

    useEffect(() => {
        if (!initial) {
            if (open) {
                setCss({ ...(variants as any).from, transition: "all 0s", visibility: "hidden" })
            } else {
                setCss({ ...(variants as any).to, transition: "all 0s", visibility: "hidden" })
            }
            const ele = document.querySelector(`.${id}`)
            if (ele) {
                (ele as any).ontransitionstart = (ev: any) => {
                    if (ev.propertyName === Object.keys(_css)[0]) {
                        const isOpen = Array.from(ele.classList).includes("transition-open")
                        onStart && onStart(isOpen ? "startOpen" : "startClose")
                    }
                }
                (ele as any).ontransitionend = (ev: any) => {
                    if (ev.propertyName === Object.keys(_css)[0]) {
                        const isOpen = Array.from(ele.classList).includes("transition-open")
                        onFinish && onFinish(isOpen ? "finishedOpen" : "finishedClose")
                    }
                }
                setElement({
                    height: ele.clientHeight,
                    width: ele.clientWidth,
                    rect: ele.getBoundingClientRect()
                })
            }
            setTimeout(() => setInitial(true), 1);
        } else {
            if (open) {
                setCss((variants as any).to)
            } else {
                setCss((p: any) => p.visibility ? { ...(variants as any).from, transition: "all 0s" } : (variants as any).from)
            }
        }
    }, [open, initial])

    let trans = ` ${duration || 400}ms ${_ease} ${delay || 0}ms`

    const cls = css({
        transition: Object.keys(_css || {}).map(k => formatProp(k)).join(trans + ", ") + trans,
        ..._css
    }, theme)

    return cls + " " + id + " transition-" + (open ? "open" : "close")
}

export default useTransition