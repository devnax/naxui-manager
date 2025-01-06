import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createThemeSwitcher, ThemeProvider, useTheme } from './src/theme'
import { adjustColor, alpha, Tag, useTransition } from './src';
import Button from './Button';
import useBreakpoinProps from './src/breakpoint/useBreakpointProps';

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
    const [variant, setVariant] = React.useState<any>("collapsVerticle")
    const [toggle, settoggle] = React.useState<any>(false)
    const { classname } = useTransition(toggle, {
        initialTransition: false,
        // easing: "easeInOut",
        // duration: 5000,
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
                    settoggle(!toggle)
                }}
                mb={2}
            >{toggle ? "Show" : "Hide"}</Button>
            {/* <Button
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
            >Change Variant</Button> */}
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


const useThemeSwitcher = createThemeSwitcher("light")

const Btn = () => {
    const theme = useTheme()
    return (
        <button>{theme.name}</button>
    )
}

const ThemeBox = () => {
    const themeSwitcher = useThemeSwitcher()
    return (
        <button
            onClick={() => {
                themeSwitcher.change(themeSwitcher.name === 'light' ? "dark" : "light")
            }}
        >
            change
        </button>
    )
}

import { useState } from "react";

const VerticalCollapse = ({ children, isOpenInitially = false }) => {
    const [isOpen, setIsOpen] = useState(isOpenInitially);

    const toggleCollapse = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div style={{ width: "300px", margin: "20px auto", border: "1px solid #ccc", borderRadius: "4px" }}>
            <button
                onClick={toggleCollapse}
                style={{
                    width: "100%",
                    padding: "10px",
                    background: "#007BFF",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px 4px 0 0",
                }}
            >
                {isOpen ? "Collapse" : "Expand"}
            </button>
            <div
                style={{
                    overflow: "hidden",
                    height: isOpen ? "auto" : "0",
                    transition: "height 0.3s ease",
                }}
            >
                <div style={{ padding: "10px" }}>{children}</div>
            </div>
        </div>
    );
};






const NUI = () => {
    const [_in, setIn] = React.useState(false)
    const [t, setT] = React.useState("light")
    const [st, ssetT] = React.useState("light")
    const theme = useThemeSwitcher()
    return (
        <ThemeProvider
            theme={theme.name}
            scrollbarCss
        >
            <VerticalCollapse>
                <p>This is the content inside the collapsible section.</p>
                <p>
                    It can contain any elements, like text, images, or other components. The height will adjust
                    automatically.
                </p>
            </VerticalCollapse>
            <ThemeBox />
            <Trans open />
            <Tag
                height={100}
                width={100}
                overflow="auto"
            >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nisi itaque, non quibusdam vel ad. Error, voluptas ipsa corrupti facere rem voluptatibus inventore! Harum numquam animi voluptate provident obcaecati natus?
            </Tag>
            <ThemeProvider theme={theme.name} >
                <Btn />
            </ThemeProvider>
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