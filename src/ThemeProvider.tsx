import * as React from 'react'
import { changeTheme, createTheme, ThemeOptionInput } from './theme'
import { OptionsProps } from 'naxcss'
import { globalConfig } from './'
import { lightPaperColor, darkPaperColor } from './theme/theme-defaults'

type Props = {
    children: any;
    css_option?: OptionsProps;
    defaultTheme?: "default" | "default-dark";
    themeOption?: ThemeOptionInput;
    fontFamily?: string;
}

const ThemeProvider = ({ children, css_option, defaultTheme, fontFamily, themeOption }: Props) => {
    React.useMemo(() => {
        fontFamily = fontFamily ?? '"Inter","Helvetica","Arial",sans-serif'
        css_option && globalConfig.set("default_css_option", css_option)
        createTheme('default', {
            ...themeOption,
            colors: {
                paper: lightPaperColor,
                ...themeOption?.colors
            },
            typography: {
                fontFamily,
                ...themeOption?.typography
            }
        })
        createTheme('default-dark', {
            ...themeOption,
            colors: {
                paper: darkPaperColor,
                ...themeOption?.colors
            },
            typography: {
                fontFamily,
                ...themeOption?.typography
            }
        })
        changeTheme(defaultTheme || "default")
    }, [])
    return children
}

export default ThemeProvider