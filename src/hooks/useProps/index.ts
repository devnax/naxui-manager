import * as React from 'react';
import { OptionsProps, classNames as mergecls } from 'naxcss';
import { css } from '../../css';
import { CSS_PROP_LIST } from './parceProps';
import { TagComponentType, TagProps } from '../../Tag';
export * from './types'

export const useProps = <T extends TagComponentType = "div">(props: TagProps<T>, css_option?: OptionsProps): TagProps<T> => {

    let f = React.useMemo(() => {
        let _css: any = props.sx || {}
        let keys: any = []

        for (let prop in props) {
            if (prop === 'sx' || prop === 'baseClass' || prop === 'classNames') {
                continue;
            } else if (prop === 'hover') {
                _css['&:hover'] = props.hover
            } else if (CSS_PROP_LIST.includes(prop)) {
                _css[prop] = (props as any)[prop]
            } else {
                keys.push(prop)
            }
        }

        return {
            keys,
            cls: mergecls([
                props.baseClass,
                ...props.classNames || [],
                Object.keys(_css).length ? css(_css, css_option) : "",
                props.className
            ])
        }
    }, [JSON.stringify(props)]);

    const _props: any = {};
    for (let prop of f.keys) {
        _props[prop] = (props as any)[prop]
    }
    if (f.cls) {
        _props.className = f.cls
    }
    return _props
}
