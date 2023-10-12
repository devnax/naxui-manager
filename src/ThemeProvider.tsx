import * as React from 'react'
import { changeTheme, createTheme, ThemeOptionInput } from './theme'
import { OptionsProps } from 'naxcss'
import { globalConfig } from './'
import { lightPaperColor, darkPaperColor } from './theme/theme-defaults'

type Props = {
    children: any;
    css_option?: OptionsProps;
    defaultTheme?: "default" | "default-dark";
    themeOption?: ThemeOptionInput
}

const ThemeProvider = ({ children, css_option, defaultTheme, themeOption }: Props) => {
    React.useMemo(() => {
        css_option && globalConfig.set("default_css_option", css_option)

        createTheme('default', {
            ...themeOption,
            colors: {
                paper: lightPaperColor,
                ...themeOption?.colors
            }
        })
        createTheme('default-dark', {
            ...themeOption,
            colors: {
                paper: darkPaperColor,
                ...themeOption?.colors
            }
        })


        changeTheme(defaultTheme || "default")
    }, [css_option, defaultTheme])
    return children
}

export default ThemeProvider