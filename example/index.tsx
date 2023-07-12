import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tag, ThemeProvider } from '../.';
import Button from './components/Button'

const App = () => {
  return (
    <ThemeProvider>
      <Button href="https://google.com">Click</Button>
      <Tag
        baseClass="Container"
        className="well"
        p={{
          sm: 10
        }}
        radius={2}
        color="success.text"
        typography='h3'
        component='h1'
        m={2}
        sx={{
          background: {
            xs: (t) => t.color.success.main,
          }
        }}
      >
        Wellcome
      </Tag>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
