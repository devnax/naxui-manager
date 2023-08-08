import { CSSProps } from 'naxcss'
import { keyframes, css } from '..'
import { useState, useEffect } from 'react';


export const animationEases = {
    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    easeIn: "cubic-bezier(0.42, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.58, 1)",
    easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)",
    linear: "cubic-bezier(0, 0, 1, 1)",
    bouncEaseIn: "cubic-bezier(0.71, 1.7, 0.77, 1.0)",
    bounceEaseOut: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
}

export interface UseAnimationProps {
    delay?: number;
    duration?: number;
    from: CSSProps;
    to: CSSProps;
    ease?: keyof typeof animationEases;
    onStart?: () => void;
    onFinish?: () => void;
}

const useAnimation = ({ from, to, delay, ease, duration, onStart, onFinish }: UseAnimationProps) => {
    let _delay = delay || 0;
    let _duration = duration || 600;
    let _ease = ease || "bounceEaseOut"

    const [timer, setTimer] = useState<any>()
    const [targetCss, setTargetCss] = useState<any>(from)
    const animName: any = keyframes({ from, to })

    useEffect(() => {
        onStart && onStart()
        clearTimeout(timer)
        const t = setTimeout(() => {
            setTargetCss(to)
            onFinish && onFinish()
        }, (_delay + _duration) - 2);
        setTimer(t)
    }, [delay, duration, animName])

    return css({
        animationName: animName,
        animationDelay: _delay + "ms",
        animationDuration: _duration + "ms",
        animationTimingFunction: animationEases[_ease] || animationEases.bounceEaseOut,
        ...(targetCss as any)
    })
}

export default useAnimation