import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tag, ThemeProvider, alpha } from '../src';
import Button from './components/Button'
import { getTheme, changeTheme, modifyTheme } from '../src';


const App = () => {
  const [disabled, setDisabled] = React.useState(false)

  return (
    <ThemeProvider >
      <Button
        disabled={disabled}

      >Button</Button>
      <Tag onClick={() => {
        console.log(disabled);

        setDisabled(!disabled ? true : false)
      }}>Click</Tag>
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
