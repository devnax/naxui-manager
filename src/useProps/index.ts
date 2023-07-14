import * as React from 'react';
import { OptionsProps } from 'naxcss';
import { css } from '../css';
import CSSPropsList from './CSSPropsList';
import { CSSPropAsAttr } from './types'
export * from './types'

export const useProps = ({ sx, hover, baseClass, ...props }: CSSPropAsAttr, css_option?: OptionsProps) => {
    const m = React.useMemo(() => {
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
            let cls: string = css({ ..._css, ..._sx }, {
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

            _props.className = ((baseClass || "") + " " + (_props.className || "") + " " + cls).replaceAll("  ", " ")
        }

        return _props
    }, [props, sx])

    return m
}