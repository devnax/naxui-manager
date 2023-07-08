type GlobalConfigType = "default_css_option"
export const globalConfig = new Map<GlobalConfigType, any>()
import ThemeProvider from './ThemeProvider'
import Tag, { TagProps } from './Tag'
export {
    ThemeProvider,
    Tag,
    TagProps
}
export * from './css'
export * from "./useProps"
export * from "./theme"

export * from './css/types'
export * from './useProps/types'
export * from './theme/types'