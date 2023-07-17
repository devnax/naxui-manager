import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tag, ThemeProvider, alpha } from '../src';
import Button from './components/Button'
import { getTheme, changeTheme } from '../src';

const App = () => {
  const [disabled, setDisabled] = React.useState(true)

  return (
    <ThemeProvider>
      <Button m={2}
        onClick={() => {
          const theme = getTheme()
          changeTheme(theme.name === 'default' ? "default-dark" : "default")
        }}
      >Button</Button>
      <Tag component="a" href="/about" m={2} onClick={() => setDisabled(!disabled)}>Click</Tag>
      <Tag component="p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae adipisci doloremque eum assumenda. Blanditiis laboriosam reprehenderit provident maxime, velit aliquam earum voluptatibus alias voluptate veniam quo sapiente! Laboriosam, quos rerum!</Tag>
      <Tag component="input" />

      <Tag
        width={100}
        height={100}
        m={2}
        radius={2}
        border={1}
      // gradientText="to bottom, primary, secondary"
      ></Tag>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
