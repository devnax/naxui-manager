type GlobalConfigType = "default_css_option" | "defaultFontFamily"
export const globalConfig = new Map<GlobalConfigType, any>()


import ThemeProvider from './ThemeProvider'
import Tag, { TagProps } from './Tag'
import isWindow from './hooks/isWindow'
import useMediaScreen from './hooks/useMediaScreen'
import useWindowResize from './hooks/useWindowResize'
export {
    ThemeProvider,
    Tag,
    TagProps,
    isWindow,
    useMediaScreen,
    useWindowResize
}
export * from './css'
export * from "./useProps"
export * from "./theme"

export * from './css/types'
export * from './useProps/types'
export * from './theme/types'