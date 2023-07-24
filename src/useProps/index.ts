import * as React from 'react';
import { OptionsProps, classNames as mergecls } from 'naxcss';
import { css } from '../css';
import CSSPropsList from './CSSPropsList';
import { CSSPropAsAttr } from './types'
export * from './types'

export const useProps = ({ sx, hover, baseClass, spacing, classNames, ...props }: CSSPropAsAttr, css_option?: OptionsProps) => {

    const values = Object.values(props);

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

        if (hover) {
            sx = sx || {};
            (sx as any)['&:hover'] = hover
        }
        if (spacing) {
            sx = sx || {};
            (sx as any)['& > *'] = {
                pt: spacing,
                pl: spacing
            }
        }
        if (Object.keys(_css).length || sx) {
            let cls: string = css({ ..._css, ...(sx as any) }, {
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
            _props.className = mergecls(baseClass && baseClass as any, _props.className, ...(classNames || []), cls)
        }
        return _props
    }, [sx, hover, baseClass, spacing, classNames, ...values])

    React.useMemo(() => {
        console.log('ss');

    }, [...values, sx, hover])
    return m
}