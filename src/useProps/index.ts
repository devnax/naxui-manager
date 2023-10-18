import * as React from 'react';
import { OptionsProps, classNames as mergecls } from 'naxcss';
import { css, css_options } from '../css';
import { CSS_PROP_LIST } from './parceProps';
import { CSSPropAsAttr } from './types'
import { getTheme, mergeObject } from '../theme';
export * from './types'

export const useProps = (props: CSSPropAsAttr, css_option?: OptionsProps) => {

    let format = React.useMemo(() => {
        const { interfaces } = getTheme()
        let sx, hover, baseClass: any, spacing, classNames: any;
        if (props.interface) {
            const _interface: Function = interfaces[props.interface]
            delete props.interface
            if (typeof _interface === 'function') {
                props = mergeObject(_interface(props), props)
            }
        }

        if (props.sx) {
            sx = props.sx;
            delete props.sx
        }

        if (props.hover) {
            hover = props.hover;
            delete props.hover
        }
        if (props.baseClass) {
            baseClass = props.baseClass;
            delete props.baseClass
        }
        if (props.spacing !== undefined) {
            spacing = props.spacing;
            delete props.spacing
        }
        if (props.classNames) {
            classNames = props.classNames;
            delete props.classNames
        }

        let _css: any = {}
        if (spacing) {
            _css['& > *'] = {
                pt: spacing,
                pl: spacing
            }
        }

        let propKeys: any = []
        for (let prop in props) {
            if (CSS_PROP_LIST.includes(prop)) {
                _css[prop] = (props as any)[prop]
            } else {
                propKeys.push(prop)
            }
        }

        _css = { ..._css, ...(sx as any || {}) }
        if (hover) {
            _css['&:hover'] = hover
        }

        let classname = "";
        if (baseClass) {
            const cssOpt = css_options()
            baseClass = cssOpt.classPrefix + baseClass
        }
        if (Object.keys(_css).length) {
            let cls: string = css(_css, {
                ...css_option,
                getProps: (p: any, v: any, _c): any => {
                    if (css_option?.getProps) {
                        let _p = css_option?.getProps(p, v, _c)
                        if (_p) {
                            return _p
                        }
                    }
                },
                getStyleTag: (t) => {
                    baseClass && t.setAttribute("data-ui", baseClass)
                }
            })
            classname = mergecls(baseClass as any, ...(classNames || []), cls, (props as any).className)
        } else {
            classname = mergecls(baseClass as any, ...(classNames || []), (props as any).className)
        }
        return {
            classname,
            propKeys
        }
    }, [JSON.stringify(props)]);

    const _props: any = {};
    if (format) {
        for (let prop of format.propKeys) {
            _props[prop] = (props as any)[prop]
        }
        if (format.classname) {
            _props.className = format.classname
        }
    }
    return _props
}
