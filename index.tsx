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
        color: {
            xs: s,
            md: "green",
            sm: "yellow"
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
            <Tag
                flexBox
                flexRow
                gap={3}
                m={2}
                flexWrap="wrap"
            >
                {
                    Array(10).fill(0).map((v, idx) => {
                        return <Tag
                            key={idx}
                            width={100}
                            height={100}
                            shadow={idx}
                            radius={1}
                        />
                    })
                }
            </Tag>

            <Breakpoin
                onClick={{
                    xs: () => alert("xs"),
                    md: () => alert("md"),
                }}
            />
            <Button
                classNames={[{ a: true }, "assa"]}
                onClick={() => {
                    setT(t === 'dark' ? "light" : "dark")
                }}
                variant="accent"
                color="outline"
            >Change</Button>
            <Tag
                flexBox
                flexColumn
                gap={3}
                p={3}
            >
                <Tag
                    m={2}
                    width={100}
                    height={100}
                    border={1}
                />
                <Tag
                    m={2}
                    width={100}
                    height={100}
                    border={1}
                    borderColor="divider"
                />
                <Button
                    onClick={() => {
                        setIn(!_in)
                    }}
                >Toggle</Button>

                <Tag
                    flexBox
                    gap={2}
                    sx={{
                        '& .trans-closed': {
                            display: "none"
                        }
                    }}
                >
                    {/* <Trans open={_in} /> */}

                    {
                        // _in && <Trans open={true} />
                    }

                    {/* <Tag
                            color="brand.text"
                            bgcolor="brand.primary"
                            className={cls}
                            onClick={() => setIn(false)}
                        >
                            <Tag color="brand.text" p={2}>Hello</Tag>
                        </Tag> */}

                    {/* <Trans
                            open={_in}
                            type="zoom"
                        /> */}
                    {/* <Trans
                            open={_in}
                            type="fadeUp"
                        />
                        <Trans
                            open={_in}
                            type="zoom"
                        />
                        <Trans
                            open={_in}
                            type="grow"
                        /> */}
                </Tag>
                {/* <Tag
                        flexBox
                        flexRow
                        flexWrap="wrap"
                        gap={4}
                    >
                        {
                            Array(20).fill(0).map((v, idx) => {
                                return <Tag width={100} height={100} radius={1} shadow={idx + 1} ></Tag>
                            })
                        }
                    </Tag> */}
            </Tag>


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

                <Button
                    variant="background"
                    color="text"
                    hover={{ ...theme?.colors.brand.template.text.hover }}
                >Home</Button>
                <Button
                    variant="background"
                    color="text"
                    hover={{ ...theme?.colors.brand.template.text.hover }}

                >About</Button>
                <Button
                    variant="background"
                    color="text"
                    hover={{ ...theme?.colors.brand.template.text.hover }}

                >Services</Button>
            </Tag>
            <Tag
                bgcolor="background"
                flexBox
                flexColumn
                gap={1}
                p={1}
            >
                <Tag
                    bgcolor="background"
                    flexBox
                    flexColumn
                >
                    {/* <List /> */}

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