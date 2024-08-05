import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider as NUIT, useTheme } from './src/theme'
import { adjustColor, alpha, Tag, useProps } from './src';
import MButton from "@mui/material/Button"
import NButton from "./Button"

import { red } from '@mui/material/colors';
import { ThemeProvider as MUIT, createTheme } from '@mui/material/styles';

const lighttheme = createTheme({
    palette: {
        primary: {
            main: red[500],
        },
    },
});

const darktheme = createTheme({
    palette: {
        primary: {
            main: "#7f91da",
        },
    },
});

const count = 10000


const MUI = () => {
    const [t, setT] = React.useState("dark")

    return (
        <div>
            <button
                onClick={() => {
                    setT(t === 'dark' ? "light" : "dark")
                }}
            >Change</button>

            <MUIT theme={t === 'dark' ? darktheme : lighttheme}>
                {
                    Array(count).fill(0).map((v, i) => {
                        return (
                            <div
                                key={i}
                            >
                                <MButton >{i}</MButton>
                            </div>
                        )
                    })
                }
            </MUIT>

        </div>
    )
}

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

const NUI = () => {
    const [t, setT] = React.useState("dark")

    return (
        <div>

            <button
                onClick={() => {
                    setT(t === 'dark' ? "light" : "dark")
                }}
            >Change</button>

            <NUIT theme={t}>

                <Colors
                    color="#00A76F"
                />

                <Colors
                    color="#00B8D9"
                />
                <Colors
                    color="#22C55E"
                />
                <Colors
                    color="#FFAB00"
                />
                <Colors
                    color="#FF5630"
                />
                <Colors
                    color="#DFE3E8"
                />
                <Colors
                    color="#454F5B"
                />




                {
                    Array(count).fill(0).map((v, i) => {
                        return (
                            <div
                                key={i}
                            >
                                <NButton >{i}</NButton>
                            </div>
                        )
                    })
                }
            </NUIT>

        </div>
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