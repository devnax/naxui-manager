import * as React from 'react'
import { CSSProps } from 'naxcss';
import { CSSPropAsAttr } from './types';
import useTagProps from './useTagProps';

export type TagComponentType = keyof JSX.IntrinsicElements | React.ComponentType<any>
export type TagProps<T extends TagComponentType = 'div'> = Omit<React.HTMLProps<T>, 'width' | 'height'> & {
    component?: T;
    children?: React.ReactNode;
    ref?: any;
} & CSSPropAsAttr

export type TagPropsRoot<T extends TagComponentType = 'div'> = TagProps<T> & {
    sxr?: CSSProps
}

const Tag = <T extends TagComponentType = 'div'>({ component, children, ...rest }: TagPropsRoot<T>, ref: React.Ref<any>) => {
    const props: any = useTagProps(rest)
    props.ref = ref
    return React.createElement(component || "div", props, children)
}

export default React.forwardRef(Tag) as typeof Tag