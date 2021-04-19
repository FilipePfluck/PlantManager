import {Welcome} from './src/screens/welcome'

import { ThemeProvider } from 'styled-components'

import React from 'react';

import light from './src/styles/themes/light'
import dark from './src/styles/themes/dark'

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <Welcome/>
    </ThemeProvider>
  );
};

export default App;
