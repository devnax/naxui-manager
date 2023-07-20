import * as React from 'react'
import { changeTheme, modifyTheme } from './theme'
import { OptionsProps } from 'naxcss'
import { globalConfig } from './'

type Props = {
    children: any;
    css_option?: OptionsProps;
    defaultFontFamily?: string;
    defaultTheme?: string;
}

const ThemeProvider = ({ children, css_option, defaultFontFamily, defaultTheme }: Props) => {
    React.useMemo(() => {
        css_option && globalConfig.set("default_css_option", css_option)
        if (defaultFontFamily) {
            modifyTheme("default", {
                typography: {
                    fontFamily: defaultFontFamily
                }
            })
            modifyTheme("default-dark", {
                typography: {
                    fontFamily: defaultFontFamily
                }
            })
        }
        changeTheme(defaultTheme || "default")
    }, [css_option, defaultFontFamily, defaultTheme])
    return children
}

export default ThemeProvider