import { CSSProps } from 'naxcss'
import { AliasesTypes } from '../css/types'

const useVariants = <T extends keyof V, V extends { [key in T]: CSSProps<AliasesTypes> }>(key: T, variants: V) => variants[key]

export default useVariants