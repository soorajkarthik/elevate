import React from 'react';
import {StyleSheet, Text} from 'react-native';

const App = () => {
  return <Text style={styles.footer}>Hello World</Text>;
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
