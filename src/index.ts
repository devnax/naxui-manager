type GlobalConfigType = "default_css_option" | "defaultFontFamily"
export const globalConfig = new Map<GlobalConfigType, any>()


import ThemeProvider from './ThemeProvider'
import Tag, { TagProps, TagComponenntType } from './Tag'
import useVariant from './hooks/useVariant'
import isWindow from './hooks/isWindow'
import useMediaScreen from './hooks/useMediaScreen'
import useWindowResize from './hooks/useWindowResize'
import ServerStyles from './ServerStyles'


export {
    ThemeProvider,
    Tag,
    TagProps,
    TagComponenntType,
    isWindow,
    useMediaScreen,
    useWindowResize,
    useVariant,
    ServerStyles
}
export * from './css'
export * from "./useProps"
export * from "./theme"

export * from './css/types'
export * from './useProps/types'
export * from './theme/types'