import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getTheme, ThemeProvider, useTheme } from './src/theme'
import { adjustColor, AliasesTypes, alpha, Tag, useTransition } from './src';
import Button from './Button';
import { css } from './src/css';
import { CSSProps, formatProp } from 'naxcss';
import useBreakpoinProps from './src/breakpoint/useBreakpointProps';

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
            <Button
                bgcolor={alpha(color, .2)}
            >
                Lighter
            </Button>
            <Button
                bgcolor={adjustColor(color, 1.3)}
            >
                Lighter
            </Button>
            <Button
                bgcolor={adjustColor(color, 1.22)}
            >
                Light
            </Button>

            <Button
                bgcolor={adjustColor(color, 1)}
            >
                Main
            </Button>
            <Button
                bgcolor={adjustColor(color, .82)}
            >
                Dark
            </Button>
            <Button
                bgcolor={adjustColor(color, .67)}
            >
                Darker
            </Button>
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
            <Button
                variant={variant}
                color="outline"
            >Button</Button>
            <Button
                variant={variant}
                color="fill"
            >Button</Button>
            <Button
                variant={variant}
                color="text"
            >Button</Button>
            <Button
                variant={variant}
                color="alpha"
            >Button</Button>
        </Tag>
    )
}

const List = () => {
    const theme = useTheme()
    return (
        <ThemeProvider theme="light" display="inline-block" width={200}>
            <Tag
                flexBox
                flexColumn
                width={200}
                radius={1}
                overflow="hidden"
                p={1}
                bgcolor="background.secondary"
            >
                <Button
                    variant="brand"
                    color="alpha"
                    onClick={() => {
                        theme.change(theme.name === 'light' ? "dark" : "light")
                    }}
                >Dashboard</Button>
                <Button
                    variant="background"
                    color="text"
                    hover={{ ...theme.colors.brand.template.alpha.hover }}
                >Courses</Button>
                <Button
                    variant="background"
                    color="text"
                    hover={{ ...theme.colors.brand.template.alpha.hover }}

                >Reports</Button>
                <Button
                    variant="background"
                    color="text"
                    hover={{ ...theme.colors.brand.template.alpha.hover }}

                >Sells</Button>
                <Button
                    variant="background"
                    color="text"
                    hover={{ ...theme.colors.brand.template.alpha.hover }}

                >Users</Button>
                <Button
                    variant="background"
                    color="text"
                    hover={{ ...theme.colors.brand.template.alpha.hover }}

                >Settings</Button>
            </Tag>
        </ThemeProvider>
    )
}

const Trans = ({ open }) => {
    const [variant, setVariant] = React.useState<any>("fadeDown")
    const { classname } = useTransition(open, {
        onFinish: (t) => {
        },
        onStart: (t) => {
        },
        variant
    })
    return (
        <Tag >
            <Button
                onClick={() => {
                    setVariant(variant === "fadeDown" ? {
                        from: {
                            transform: `translateX(20px)`,
                            opacity: 0
                        },
                        to: {
                            transform: `translateX(100px)`,
                            opacity: 1
                        }
                    } : "fadeDown")
                }}
                mb={2}
            >Change Variant</Button>
            <Tag
                // display={state === 'closed' ? "none" : "inherit"}
                color="brand.text"
                width={100}
                height={100}
                radius={1}
                bgcolor="brand.primary"
                className={classname}
                shadow={1}
            >
                <Tag color="brand.text" p={2}>Hello</Tag>
            </Tag>
        </Tag>
    )
}

const Breakpoin = ({ onClick }: any) => {
    const [s, dispatch] = React.useState("red")
    const props = useBreakpoinProps<any>({
        onClick,
        children: {
            xs: <>Nice</>,
            md: <>Hmm</>
        },
        color: {
            xs: s,
            md: "green",
            sm: "orange"
        }
    })

    return (
        <Tag
            {...props}
            onClick={() => dispatch(s === 'red' ? "green" : "red")}
        >
            Click me
        </Tag>
    )
}

const NUI = () => {
    const [_in, setIn] = React.useState(false)
    const [t, setT] = React.useState("light")
    const theme = getTheme(t)

    // const cls = useTransition(_in, element => {
    //     return {
    //         onOpen: () => {
    //             console.log('open');
    //         },
    //         onOpened: () => {
    //             console.log('opened');
    //         },
    //         onClose: () => {
    //             console.log('close');
    //         },
    //         onClosed: () => {
    //             console.log('closed');
    //         },
    //         variant: "fadeUp"
    //     }
    // })

    return (
        <ThemeProvider
            theme={t}
            height="100vh"
            onChange={(t) => {
                setT(t)
            }}
        >
            <Trans open={true} />
            {
                Array(100).fill(0).map((v, idx) => {
                    return <Breakpoin
                        key={idx}
                    />
                })
            }
            <button onClick={() => setT(t === 'dark' ? "light" : "dark")}>toggle</button>
        </ThemeProvider>

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