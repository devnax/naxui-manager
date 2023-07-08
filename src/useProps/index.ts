import { useMemo } from 'react';
import { OptionsProps } from 'naxcss';
import { css } from '../css';
import CSSPropsList from './CSSPropsList';
import { CSSPropAsAttr } from './types'
export * from './types'

export const useProps = ({ sx, hover, ...props }: CSSPropAsAttr, css_option?: OptionsProps) => {
    const m = useMemo(() => {
        const _props: any = {}
        const _css: any = {}
        for (const prop in props) {
            if (CSSPropsList.includes(prop)) {
                _css[prop] = (props as any)[prop]
            } else {
                _props[prop] = (props as any)[prop]
            }
        }

        if (Object.keys(_css).length || sx) {
            let _sx: any = sx as any || {}
            if (hover) {
                _sx['&:hover'] = hover
            }
            const cls = css({ ..._css, ..._sx }, {
                ...css_option,
                getProps: (p: any, v: any): any => {
                    if (css_option?.getProps) {
                        let _p = css_option?.getProps(p, v)
                        if (_p) {
                            return _p
                        }
                    }
                }
            })
            // injectStyle(_css_return.css, _css_return.classname)
            _props.className = cls + (_props.className ? " " + _props.className : "")
        }

        return _props
    }, [props, sx])

    return m
}