import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tag, ThemeProvider } from '../src';
import Button from './components/Button'
// import Button from '@mui/material/Button'
import { getTheme, changeTheme, modifyTheme } from '../src';
import useTransitions from '../src/hooks/useTransitions';
import useCornerVariant from '../src/hooks/useCornerVariant';
import useUIVariant from '../src/hooks/useUIVariant';
import Stack from './components/Stack'
import { alpha } from '../src'

const App = () => {
  const [In, setIn] = React.useState(false)
  const [ref, cls] = useTransitions("fadeDown", In)


  return (
    <ThemeProvider >
      <Button onClick={() => setIn(!In)} >Random</Button>
      <Tag
        ref={ref}
        height={40}
        px={1.5}
        radius={1}
        m={2}
        fontWeight={500}
        bgcolor={alpha("primary", 1)}
        color={"#fff"}
        hover={{
          bgcolor: alpha("primary", 1.2)
        }}
        alignItems="center"
        justifyContent="center"
        flexBox
        transition="all .3s"
        cursor="pointer"
        display="inline-flex"
      >
        Button text
      </Tag>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
