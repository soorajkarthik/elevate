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
          <MyMap />
        </Animatable.View>
        <Animatable.View
          style={ styles.actionContainer }
          animation="bounceInUp"
          delay={ 500 }
          duration={ 3000 }
          easing="ease"
        >
          <AlertDetailView style={ styles.detailView } />
          <TouchableOpacity
            style={ styles.createButton }
            onPress={ () => console.log("press") }>
            <Text style={ styles.createText }>Create Alert</Text>
          </TouchableOpacity>
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
    flex: 3,
    width: '100%',
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  actionContainer: {
    flex: 2,
    paddingTop: 50,
    backgroundColor: Colors.PRIMARY_COLOR,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center"
  },

  detailView: {
    flex: 7
  },

  createButton: {
    backgroundColor: Colors.ACCENT_COLOR,
    borderRadius: 10,
    paddingHorizontal: 50,
    marginBottom: 15,
    alignItems: 'center',
    paddingVertical: 7,
    flex: 1
  },

  createText: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.BUTTON_TEXT_COLOR,
  },
});

export default MapScreen;
