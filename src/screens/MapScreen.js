import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppContext } from '../context/Context';
import MyMap from '../components/MyMap';
import AlertDetailView from "../components/AlertDetailView";
import AlertCreationForm from "../components/AlertCreationForm";


class MapScreen extends Component {
  static contextType = AppContext;

  render() {
    return (
      <View style={ styles.container }>
        <MyMap style={ styles.map } />
        <AlertDetailView />
        <AlertCreationForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
  },

  map: {
    height: '50%',
    width: '100%'
  }
});

export default MapScreen;
