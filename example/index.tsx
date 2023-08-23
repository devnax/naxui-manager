import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tag, ThemeProvider } from '../src';
import Button from './components/Button'
// import Button from '@mui/material/Button'
import { getTheme, changeTheme, modifyTheme } from '../src';
import useTransitions from '../src/hooks/useTransitions';
import Stack from './components/Stack'
import { alpha } from '../src'

const App = () => {
  const [In, setIn] = React.useState(false)
  const [ref, cls] = useTransitions("fadeDown", In)

  const [variant, setVariant] = React.useState<any>('filled')
  const [color, setColor] = React.useState<any>('default')
  const [softness, setSoftness] = React.useState<any>()


  return (
    <ThemeProvider >
      <Button onClick={() => setIn(!In)} >Random</Button>
      <Tag
        ref={ref}
        height={40}
        px={3}
        cursor="pointer"
        radius={1}
        m={2}
        fontWeight={500}
        alignItems="center"
        justifyContent="center"
        flexBox
        transition="all .3s"
        display="inline-flex"
      >
        Submit
        </Tag>
      <Tag
        flexBox
        direction="row"
        gap={1}
        p={3}
      >
        <select
          onChange={(e) => {
            setVariant(e.target.value);
          }}
        >
          <option value="filled">filled</option>
          <option value="outlined">outlined</option>
          <option value="text">text</option>
        </select>
        <select
          onChange={(e) => {
            setColor(e.target.value);
          }}
        >
          <option value="default">default</option>
          <option value="primary">primary</option>
          <option value="secondary">secondary</option>
          <option value="success">success</option>
          <option value="error">error</option>
          <option value="warning">warning</option>
        </select>
        <input
          type="number"
          step={.1}
          min={0}
          max={2}
          onChange={(e) => {
            setSoftness(e.target.value)
          }}
        />
      </Tag>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
