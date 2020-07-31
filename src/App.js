import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthNavigator from './navigators/AuthNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;
