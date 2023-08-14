import * as React from 'react';
import { OptionsProps, classNames as mergecls } from 'naxcss';
import { css, css_options } from '../css';
import { CSS_PROP_LIST } from './parceProps';
import { CSSPropAsAttr } from './types'
export * from './types'


export const useProps = (props: CSSPropAsAttr, css_option?: OptionsProps) => {

    return React.useMemo(() => {

        let { sx, hover, baseClass, spacing, classNames, ...restProps } = props

        let _css: any = {}
        let _props: any = {}
        for (let prop in restProps) {
            if (CSS_PROP_LIST.includes(prop)) {
                _css[prop] = (props as any)[prop]
            } else {
                _props[prop] = (props as any)[prop]
            }
        }

        _css = { ..._css, ...(sx as any || {}) }
        if (hover) {
            _css['&:hover'] = hover
        }
        if (spacing) {
            _css['& > *'] = {
                pt: spacing,
                pl: spacing
            }
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
            if (baseClass) {
                const cssOpt = css_options()
                baseClass = cssOpt.classPrefix + baseClass
            }
            _props.className = mergecls(baseClass as any, ...(classNames || []), cls, _props.className)
        }

        return _props
    }, [JSON.stringify(props)])

}
