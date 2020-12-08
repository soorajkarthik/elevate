import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyStatusBar from '../components/MyStatusBar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class TempScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
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

  map: {
    height: '100%',
    width: '80%',
  },
});
