import * as React from 'react';
import { OptionsProps, classNames as mergecls } from 'naxcss';
import { css } from '../../css';
import { CSS_PROP_LIST } from './parceProps';
import { TagComponentType, TagProps, TagPropsRoot } from '../../Tag';
export * from './types'

export const useProps = <T extends TagComponentType = "div">(props: TagPropsRoot<T>, css_option?: OptionsProps): TagProps<T> => {

    let f = React.useMemo(() => {
        let _css: any = props.defaultSx || {}
        let keys: any = []

        for (let prop in props) {
            if (prop === 'defaultSx' || prop === 'baseClass' || prop === 'classNames') {
                continue;
            } else if (prop === 'sx') {
                _css = {
                    ..._css,
                    ...(props as any).sx
                }
            } else if (prop === 'hover') {
                _css['&:hover'] = props.hover
            } else if (CSS_PROP_LIST[prop]) {
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
