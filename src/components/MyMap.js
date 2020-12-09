import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AppContext } from '../context/Context';

class MyMap extends Component {
  static contextType = AppContext;

  render() {
    return (
      <MapView
        style={styles.map}
        pitchEnabled
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default MyMap;
