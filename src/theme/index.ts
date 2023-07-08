import { ThemeOptions, ObjectType, StateKeys, ThemeOptionsPartial, ScaleNameTypes } from "./types"
import defaultThemeOption from './default'
import { useEffect, useId, useState } from "react"
import { darkModeColor } from "./default/color"
export * from './types'
const ThemeFactory = new Map<string, ThemeOptions>()
const DispatchFactory = new Map<string, () => void>()
export const State = new Map<StateKeys, any>()

const ratios: { [scale in ScaleNameTypes]: number } = {
    "minor-second": 1.067,
    "major-second": 1.125,
    "Minor-third": 1.200,
    "major-third": 1.250,
    "perfect-fourth": 1.333,
    "augmented-fourth": 1.414,
    "perfect-fifth": 1.500,
    "golden-ratio": 1.618,
}

function createFontScale(baseSize: number, scale: ScaleNameTypes, length = 8) {
    const ratio = ratios[scale]
    const fontSizes = [];
    for (let i = 0; i < length; i++) {
        const size = Math.round(baseSize * Math.pow(ratio, i));
        fontSizes.push(size);
    }
    return fontSizes;
}

export const mergeTheme = (a: ObjectType, b: ObjectType) => {
    a = { ...a }
    b = { ...b }
    for (const key in b) {
        const v = (b as any)[key]
        if (typeof v === 'object' && !Array.isArray(v)) {
            a[key] = mergeTheme(a[key], b[key])
        } else {
            a[key] = v
        }
    }
    return a
}
export const createTheme = (name: string, options: ThemeOptionsPartial): ThemeOptions => {
    if (!ThemeFactory.get(name)) {
        ThemeFactory.set(name, mergeTheme(defaultThemeOption, { ...options, name }) as ThemeOptions)
        const t = ThemeFactory.get(name) as ThemeOptions
        const sizes = createFontScale(t.typography.scale.baseFontSize, t.typography.scale.name)
        t.typography.scale.sizes = sizes
        ThemeFactory.set(name, t)
    }
    return ThemeFactory.get(name) as ThemeOptions
}

export const useTheme = (): ThemeOptions => {
    const id = useId()
    const [, dispatch] = useState(0)
    useEffect(() => {
        DispatchFactory.set(id, () => dispatch(Math.random()))
        return () => {
            DispatchFactory.delete(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const name = State.get("current_theme")
    return ThemeFactory.get(name) || createTheme("default", defaultThemeOption) as ThemeOptions
}

export const getTheme = (): ThemeOptions => {
    const name = State.get("current_theme")
    return ThemeFactory.get(name) || createTheme("default", defaultThemeOption)
}

export const changeTheme = (name: string) => {
    if (ThemeFactory.has(name)) {
        State.set("current_theme", name)
        DispatchFactory.forEach(d => d())
    }
}

createTheme('default', defaultThemeOption)
createTheme('default-dark', {
    color: {
        ...darkModeColor
    }
})