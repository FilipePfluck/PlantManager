import React from 'react';

import { ThemeProvider } from 'styled-components'

import Routes from './src/routes'

import light from './src/styles/themes/light'
import dark from './src/styles/themes/dark'

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <Routes/>
    </ThemeProvider>
  );
};

export default App;