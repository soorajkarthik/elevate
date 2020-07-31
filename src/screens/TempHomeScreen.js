import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class TempHomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> This is a temp home screen </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
