import * as React from 'react';
import { OptionsProps, classNames as mergecls } from 'naxcss';
import { css } from '../../css';
import { CSS_PROP_LIST } from './parceProps';
import { CSSPropAsAttr } from './types'
import { mergeObject } from '../../theme';
export * from './types'


export const useProps = (props: CSSPropAsAttr, css_option?: OptionsProps) => {

    let format = React.useMemo(() => {
        let sx, hover, baseClass: any, classNames: any;

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
        if (props.classNames) {
            classNames = props.classNames;
            delete props.classNames
        }

        let _css: any = {}
        let propKeys: any = []

        for (let prop in props) {
            if (CSS_PROP_LIST.includes(prop)) {
                _css[prop] = (props as any)[prop]
            } else {
                propKeys.push(prop)
            }
        }

        _css = sx ? mergeObject(_css, sx) : _css

        if (hover) {
            _css['&:hover'] = hover
        }

        let classname = "";

        if (Object.keys(_css).length) {
            let cls: string = css(_css, css_option)
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
