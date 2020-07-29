import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <View>
      <LoginScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 100,
  },
});

export default App;
