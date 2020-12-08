import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Colors from '../constants/Colors';
import MyMap from '../components/MyMap';

class MapScreen extends Component {
  render() {
    return <MyMap></MyMap>;
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.BACKGROUND_COLOR,
  },

  logo: {
    transform: [{ scale: 0.7 }],
    maxWidth: 400,
    maxHeight: 100,
  },

  headerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  text: {
    color: Colors.PRIMARY_COLOR,
    textAlign: 'justify',
    fontSize: 20,
    marginHorizontal: 50,
    fontWeight: 'bold',
  },

  formContainerWrapper: {
    flex: 1,
  },

  formContainer: {
    backgroundColor: Colors.PRIMARY_COLOR,
    height: '100%',
    paddingTop: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default MapScreen;
