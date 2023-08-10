import { CSSProps } from 'naxcss'
import { keyframes, css } from '..'
import { useState, useEffect } from 'react';


export const animationEases = {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    linear: "cubic-bezier(0, 0, 1, 1)",
    easeBounceOut: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
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
    let _ease = ease || "easeBounceOut"

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
        animationTimingFunction: animationEases[_ease] || animationEases.easeBounceOut,
        ...(targetCss as any)
    })
}

export default useAnimation