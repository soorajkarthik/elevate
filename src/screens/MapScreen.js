import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MyMap from '../components/MyMap';
import { AppContext } from '../context/Context';


class MapScreen extends Component {
  static contextType = AppContext;

  render() {
    return (
      <View style={ styles.container }>
        <MyMap />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
  },
});

export default MapScreen;
