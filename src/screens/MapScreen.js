import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AlertDetailView from "../components/AlertDetailView";
import MyMap from '../components/MyMap';
import MyStatusBar from '../components/MyStatusBar';
import * as Colors from "../constants/Colors";
import { AppContext } from '../context/Context';


class MapScreen extends Component {
  static contextType = AppContext;

  render() {
    return (
      <View style={ styles.container }>
        <MyStatusBar />
        <Animatable.View
          style={ styles.mapContainer }
          animation="bounceInDown"
          duration={ 3000 }
          easing="ease"
        >
          <MyMap style={ styles.map } />
        </Animatable.View>
        <Animatable.View
          style={ styles.detailContainer }
          animation="bounceInUp"
          delay={ 500 }
          duration={ 3000 }
          easing="ease"
        >
          <AlertDetailView />
        </Animatable.View>
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
    backgroundColor: Colors.BACKGROUND_COLOR
  },

  mapContainer: {
    flex: 2,
    width: '100%',
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  map: {
    width: "100%",
    height: "100%"
  },

  detailContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.PRIMARY_COLOR,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center"
  }
});

export default MapScreen;
