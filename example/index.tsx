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
  const [height, setHeight] = React.useState(200)
  const [ref, cls] = useTransitions("collapsVerticle", In, {
    duration: In ? 0 : 600
  })

  const [variant, setVariant] = React.useState<any>('filled')
  const [color, setColor] = React.useState<any>('default')
  const [softness, setSoftness] = React.useState<any>()


  return (
    <ThemeProvider >

      <Tag flexBox gap={32} flexWrap="wrap" p={3}>
        {
          Array(20).fill(1).map((v, i) => <Tag
            key={i}
            width={100}
            height={100}
            radius={2}
            shadow={i + 1}
          />)
        }
      </Tag>
      {/* <Tag p={3}>
        <Tag
          className={cls}
          ref={ref}
        >
          <Tag
            bgcolor="color.primary"
            p={3}
            width={200}
            height={height}
          >
          </Tag>
        </Tag>
        <Button
          mt={2}
          onClick={() => {
            setIn(!In)
          }}
        >Toggle</Button>
        <Button
          mt={2}
          onClick={() => {
            setHeight(height === 200 ? 300 : 200)
          }}
        >Change Height</Button>
      </Tag> */}
      {/* <Tag p={3}>
        <Tag typography="h1" borderBottom={1} mb={1} p={1}>A Visual Type</Tag>
        <Tag typography="text">What looked like a small patch of purple grass, above five feet square, was moving across the sand in their direction.</Tag>
        <Tag mt={1} typography="subtext"> When it came near enough he perceived that it was not grass; there were no blades, but only purple roots. The roots were revolving, for each small plant in the whole patch, like the spokes of a rimless wheel.</Tag>
      </Tag>
      <Tag
        m={1}
        width={300}
        height={40}
        radius={1}
        bgcolor={"color.paper"}
      />
      <Button onClick={() => {
        const theme = getTheme()
        changeTheme(theme.name === 'default' ? "default-dark" : "default")
      }} id={undefined} >Random</Button>
      <Tag
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
      </Tag> */}
    </ThemeProvider>
  );
};

import { StrictMode } from 'react';

ReactDOM.render(<StrictMode><App /></StrictMode>, document.getElementById('root'));
