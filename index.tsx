import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getTheme, ThemeProvider as NUIT, useTheme } from './src/theme'
import { adjustColor, alpha, Tag, useProps } from './src';
import NButton from "./Button"


const count = 1


const Colors = ({ color }) => {
    return (
        <Tag
            flexBox
            flexDirection="row"
            gap={2}
            p={1}
            m={0}
            data-name="asd"

        >
            <NButton
                bgcolor={alpha(color, .2)}
            >
                Lighter
            </NButton>
            <NButton
                bgcolor={adjustColor(color, 1.3)}
            >
                Lighter
            </NButton>
            <NButton
                bgcolor={adjustColor(color, 1.22)}
            >
                Light
            </NButton>

            <NButton
                bgcolor={adjustColor(color, 1)}
            >
                Main
            </NButton>
            <NButton
                bgcolor={adjustColor(color, .82)}
            >
                Dark
            </NButton>
            <NButton
                bgcolor={adjustColor(color, .67)}
            >
                Darker
            </NButton>
        </Tag>
    )
}


const VariantButtons = ({ variant }: any) => {
    return (
        <Tag
            flexBox
            gap={2}
            alignItems="center"
            p={2}
        >
            <NButton
                variant={variant}
                color="outline"
            >Button</NButton>
            <NButton
                variant={variant}
                color="fill"
            >Button</NButton>
            <NButton
                variant={variant}
                color="text"
            >Button</NButton>
            <NButton
                variant={variant}
                color="alpha"
            >Button</NButton>
        </Tag>
    )
}


const List = () => {
    const theme = useTheme()
    return (
        <Tag
            flexBox
            flexColumn
            width={200}
            radius={1}
            overflow="hidden"
            p={1}
            bgcolor="background.secondary"
        >
            <NButton
                variant="brand"
                color="alpha"
            >Dashboard</NButton>
            <NButton
                variant="background"
                color="text"
                hover={{ ...theme.colors.brand.template.alpha.hover }}
            >Courses</NButton>
            <NButton
                variant="background"
                color="text"
                hover={{ ...theme.colors.brand.template.alpha.hover }}

            >Reports</NButton>
            <NButton
                variant="background"
                color="text"
                hover={{ ...theme.colors.brand.template.alpha.hover }}

            >Sells</NButton>
            <NButton
                variant="background"
                color="text"
                hover={{ ...theme.colors.brand.template.alpha.hover }}

            >Users</NButton>
            <NButton
                variant="background"
                color="text"
                hover={{ ...theme.colors.brand.template.alpha.hover }}

            >Settings</NButton>
        </Tag>
    )
}

const NUI = () => {
    const [t, setT] = React.useState("light")
    const theme = getTheme(t)

    return (
        <Tag>

            <NUIT theme={t} height="100vh">
                {/* <Tag
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    zIndex={1}
                    bgcolor={theme?.colors.background.template.fill.bgcolor}
                /> */}

                <Tag
                    height={60}
                    bgcolor="background.primary"
                    flexBox
                    alignItems="center"
                    px={2}
                    borderBottom={1}
                    borderBottomColor="background.secondary"
                >
                    <NButton
                        variant="background"
                        color="text"
                        hover={{ ...theme?.colors.brand.template.text.hover }}
                    >Home</NButton>
                    <NButton
                        variant="background"
                        color="text"
                        hover={{ ...theme?.colors.brand.template.text.hover }}

                    >About</NButton>
                    <NButton
                        variant="background"
                        color="text"
                        hover={{ ...theme?.colors.brand.template.text.hover }}

                    >Services</NButton>
                </Tag>
                <Tag
                    bgcolor="background"
                    flexBox
                    flexColumn
                    gap={1}
                    p={1}
                >

                    <NButton
                        onClick={() => {
                            setT(t === 'dark' ? "light" : "dark")
                        }}
                        variant="background"
                        color="outline"
                    >Change</NButton>
                    <Tag
                        bgcolor="background"
                        flexBox
                        flexColumn
                    >
                        <List />

                        <VariantButtons
                            variant="background"
                        />
                        <VariantButtons
                            variant="brand"
                        />
                        <VariantButtons
                            variant="accent"
                        />
                        <VariantButtons
                            variant="success"
                        />
                        <VariantButtons
                            variant="info"
                        />
                        <VariantButtons
                            variant="warning"
                        />
                        <VariantButtons
                            variant="danger"
                        />
                    </Tag>
                </Tag>
            </NUIT>

        </Tag>
    )
}

const App = () => {
    return (
        <>
            <NUI />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));