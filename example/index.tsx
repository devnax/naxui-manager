import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tag, ThemeProvider, alpha } from '../src';
import Button from './components/Button'
// import Button from '@mui/material/Button'
import { getTheme, changeTheme, modifyTheme } from '../src';


const App = () => {
  const [disabled, setDisabled] = React.useState(false)

  return (
    <ThemeProvider >
      <Tag spacing={3} p={3}>
        <Tag width={100} height={10} bgcolor="primary"></Tag>
        <Tag width={100} height={10} bgcolor="primary.dark"></Tag>
        <Tag width={100} height={10} bgcolor="primary.light"></Tag>
      </Tag>
      <Tag onClick={() => {
        setDisabled(!disabled ? true : false)
      }}>Click</Tag>

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
