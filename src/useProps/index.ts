import * as React from 'react';
import { OptionsProps, classNames as mergecls } from 'naxcss';
import { css, css_options } from '../css';
import { extractProps } from './parceProps';
import { CSSPropAsAttr } from './types'
export * from './types'


export const useProps = ({ sx, hover, baseClass, spacing, classNames, ...props }: CSSPropAsAttr, css_option?: OptionsProps) => {
    const extract = extractProps(props)

    extract.css = React.useMemo(() => {
        let _css: any = {}
        for (let ckey in extract.css) {
            if ((extract as any).css[ckey] !== undefined) {
                _css[ckey] = (extract as any).css[ckey]
            }
        }

        return _css
    }, [Object.values(extract.css).join('')])

    let _css: any = { ...extract.css, ...(sx as any) }
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
        extract.props.className = mergecls(baseClass as any, classNames as any, cls, extract.props.className)
    }

    return extract.props

}
