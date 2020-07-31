import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyStatusBar from '../components/MyStatusBar';

export default class TempHomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
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
