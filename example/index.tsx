import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tag, ThemeProvider, alpha } from '../src';
import Button from './components/Button'
import { getTheme, changeTheme, modifyTheme } from '../src';


const App = () => {
  const [disabled, setDisabled] = React.useState(true)

  return (
    <ThemeProvider >
      <Button m={2}
        onClick={() => {
          const theme = getTheme()
          changeTheme(theme.name === 'default' ? "default-dark" : "default")
        }}
        color="error.text"
        bgcolor="error"
      >Button</Button>
      <Tag component="a" href="/about" m={2} onClick={() => setDisabled(!disabled)}>Click</Tag>
      <Tag component="p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae adipisci doloremque eum assumenda. Blanditiis laboriosam reprehenderit provident maxime, velit aliquam earum voluptatibus alias voluptate veniam quo sapiente! Laboriosam, quos rerum!</Tag>
      <Tag component="input" />

      <Tag
        m={2}
        radius={2}
        border={1}
        color="linear(120deg, primary 1%, secondary.dark)"
        typography="h1"
      >Move Faster</Tag>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
