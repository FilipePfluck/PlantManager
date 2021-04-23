import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native'

import { ThemeProvider } from 'styled-components'

import Routes from './src/routes'

import light from './src/styles/themes/light'
import dark from './src/styles/themes/dark'

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF"/>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FfF'}}>
        <Routes/>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;