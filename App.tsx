import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView, ActivityIndicator } from 'react-native'

import {ThemeProvider, useTheme} from './src/context/ThemeContext'

import Routes from './src/routes'

const App = () => {

  return (
    <ThemeProvider>
        <Routes/>
    </ThemeProvider>
  );
};

export default App;