type GlobalConfigType = "default_css_option" | "defaultFontFamily"
export const globalConfig = new Map<GlobalConfigType, any>()

import ThemeProvider from './ThemeProvider'
import Tag, { TagProps, TagComponenntType } from './Tag'
import isWindow from './hooks/isWindow'
import useMediaScreen from './hooks/useMediaScreen'
import useWindowResize from './hooks/useWindowResize'
import serverStyleTags from './serverStyleTags'
import useAnimation, { UseAnimationProps } from './hooks/useAnimation'
import useTransition, { UseTransitionProps } from './hooks/useTransiton'
import useTransitions, { UseTransitionsProps, UseTransitionsVariantsTypes, UseTransitionsVariant, UseTransitionsVariantCallback } from './hooks/useTransitions'

export * from './css'
export * from "./useProps"
export * from "./theme"
export * from './css/types'
export * from './useProps/types'
export * from './theme/types'

export type {
    UseAnimationProps,
    UseTransitionProps,
    UseTransitionsProps,
    UseTransitionsVariantsTypes,
    UseTransitionsVariant,
    UseTransitionsVariantCallback
}

export {
    ThemeProvider,
    Tag,
    TagProps,
    TagComponenntType,
    isWindow,
    useMediaScreen,
    useWindowResize,
    serverStyleTags,
    useAnimation,
    useTransition,
    useTransitions,
}