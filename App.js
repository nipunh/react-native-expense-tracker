import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Routes from './router';

const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Provider store={store}>
          <Routes />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
