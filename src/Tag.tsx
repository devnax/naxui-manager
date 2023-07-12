import { createElement, forwardRef, ReactNode, HTMLProps } from 'react'
import { CSSPropAsAttr, useProps } from './useProps'

export type TagComponenntType = keyof JSX.IntrinsicElements | React.ComponentType<any>
export type TagProps<T extends TagComponenntType = 'div'> = HTMLProps<T> & {
    component?: T;
    children?: ReactNode;
    ref?: any;
} & CSSPropAsAttr

const Tag = <T extends TagComponenntType = 'div'>({ component, children, ...rest }: TagProps<T>, ref: React.Ref<any>) => {
    const props: any = useProps(rest)
    return createElement(component || "div", { ...props, ref }, children)
}

export default forwardRef(Tag) as typeof Tag