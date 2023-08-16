import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tag, ThemeProvider, alpha } from '../src';
import Button from './components/Button'
// import Button from '@mui/material/Button'
import { getTheme, changeTheme, modifyTheme } from '../src';
import useTransitions from '../src/hooks/useTransitions';
import useColorVariant from '../src/hooks/useColorVariant';
import useCornerVariant from '../src/hooks/useCornerVariant';
import useUIVariant from '../src/hooks/useUIVariant';
import Stack from './components/Stack'


const App = () => {
  const [In, setIn] = React.useState(false)
  const [ref, cls] = useTransitions("fadeDown", In)
  const colorCss = useColorVariant("error", .2)
  const cornerCss = useCornerVariant("rounded")
  const usCss = useUIVariant("filled", "primary", .2)
  const hoverusCss = useUIVariant("filled", "primary", .1)

  return (
    <ThemeProvider >
      <Button onClick={() => setIn(!In)} >Random</Button>
      <Tag
        ref={ref}
        // className={cls}
        width={100}
        height={40}
        radius={1}
        m={2}
        bgcolor="primary"
        alignItems="center"
        justifyContent="center"
        flexBox
        transition="all .3s"
        {...usCss}
        hover={hoverusCss}
      >
        Hello
      </Tag>
      {/* {
        new Array(2000).fill(0).map((_i, idx) => <Stack
          key={idx}
          fontSize={In ? idx : 20}
          onClick={() => { }}
          onDoubleClick={() => { }}
          onMouseDown={() => { }}
          onMouseLeave={() => { }}
          onMouseEnter={() => { }}
          onMouseOut={() => { }}
          onMouseMove={() => { }}
          onMouseOver={() => { }}
          onMouseUp={() => { }}
          onMouseDownCapture={() => { }}
        >
          Well
      </Stack>)
      } */}
      {/* <Tag
        flexBox
        flexRow
        gap={1}
        baseClass="stack"
      >
        <Tag>
          <Tag width={100} height={100} bgcolor="primary"></Tag>
        </Tag>
        <Tag>
          <Tag width={100} height={100} bgcolor="primary"></Tag>
        </Tag>
      </Tag>
      <Tag m={5}>
        <Tag
          border={1}
          direction="row"
          component="input"
          radius={2}
          p={2}
          display="inline-flex"
          justifyContent="center"
          alignItems="center"
          transition="all .3s"
          fontWeight={500}
          fontSize={14}
          placeholder="Write something..."
          {...colorCss}
          {...cornerCss}
          {...usCss}
        />
      </Tag>
      <Tag spacing={3} p={3}>
        <Tag width={100} height={10} bgcolor="primary"></Tag>
        <Tag width={100} height={10} bgcolor="primary.dark"></Tag>
        <Tag width={100} height={10} bgcolor="primary.light"></Tag>
      </Tag>
      <Tag p={3} m={3}>
        <Tag ref={ref} className={classname} width={100} height={100} radius={2} shadow={4} m={2} bgcolor="primary">
          Wellcome
        </Tag>
      </Tag>
      <Tag component="button" typography="button" cursor="pointer" onClick={() => {
        setIn(!In ? true : false)
      }}>Click</Tag> */}

      {/* {
        Array.from(Array(10).keys()).map((_i, idx) => <Button key={idx} disabled={disabled} sx={{ fontFamily: idx }}>Button {idx}</Button>)
      } */}
      {/* <Tag component="p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae adipisci doloremque eum assumenda. Blanditiis laboriosam reprehenderit provident maxime, velit aliquam earum voluptatibus alias voluptate veniam quo sapiente! Laboriosam, quos rerum!</Tag>
      <Tag component="input" />

      <Tag
        // m={2}
        // radius={2}
        // borderBottom={0}
        // color="linear(120deg, primary 1%, secondary.dark)"
        // typography="h1"
        spacing={{
          xs: 2
        }}
        flexBox
        width={200}
        flexWrap="wrap"
      >
        <Tag width={100}>Move Faster</Tag>
        <Tag width={100}>Second</Tag>
        <Tag width={100}>Move Faster</Tag>
        <Tag width={100}>Second</Tag>
        <Tag width={100}>Move Faster</Tag>
        <Tag width={100}>Second</Tag>
        <Tag width={100}>Move Faster</Tag>
        <Tag width={100}>Second</Tag>
      </Tag> */}
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
