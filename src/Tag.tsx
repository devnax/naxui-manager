import * as React from 'react'
import { CSSPropAsAttr, useProps } from './hooks/useProps'

export type TagComponentType = keyof JSX.IntrinsicElements | React.ComponentType<any>
export type TagProps<T extends TagComponentType = 'div'> = Omit<React.HTMLProps<T>, 'width' | 'height'> & {
    component?: T;
    children?: React.ReactNode;
    ref?: any;
} & CSSPropAsAttr

const Tag = <T extends TagComponentType = 'div'>({ component, children, ...rest }: TagProps<T>, ref: React.Ref<any>) => {
    const props: any = useProps(rest)
    return React.createElement(component || "div", { ...props, ref }, children)
}

export default React.forwardRef(Tag) as typeof Tag