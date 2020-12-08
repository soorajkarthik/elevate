import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class MyMap extends Component {
  render() {
    return (
      <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
        <View></View>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '95%',
    ...StyleSheet.absoluteFillObject,
  },
});

export default MyMap;
