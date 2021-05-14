import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyStatusBar from '../components/MyStatusBar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class TempScreen extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <MyStatusBar />
        <Text style={ styles.text }>TEMP SCREEN</Text>
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
