import React, { Component } from 'react';
import { Modal, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AlertDetailView from "../components/AlertDetailView";
import AlertCreationForm from "../components/AlertCreationForm";
import MyMap from '../components/MyMap';
import MyStatusBar from '../components/MyStatusBar';
import * as Colors from "../constants/Colors";
import * as Constants from "../constants/Values";
import { AppContext } from '../context/Context';


class MapScreen extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

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
          <AlertDetailView style={ styles.detailView } />
          <TouchableOpacity
            style={ styles.createButton }>
            <Text style={ styles.createText } onPress={ this.toggleModal }>Create Alert</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Modal visible={ this.state.modalVisible } transparent={ true } animationType="fade">
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={ Platform.select({
              ios: () => Constants.IOS_KEYBOARD_PADDING,
              android: () => Constants.ANDROID_KEYBOARD_PADDING,
            })() }>
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
              <View style={ styles.modal }>
                <AlertCreationForm style={ styles.creationForm } closeFunction={ this.toggleModal } />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>
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
    alignItems: "center",
    justifyContent: "center"
  },

  detailView: {
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: 50,
    paddingHorizontal: 35,
    paddingVertical: 20,
    flex: 4,
    justifyContent: "center"
  },

  createButton: {
    backgroundColor: Colors.ACCENT_COLOR,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    alignItems: 'center',
    paddingVertical: 7,
    marginVertical: 10,
    flex: 1
  },

  createText: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.BUTTON_TEXT_COLOR,
  },

  modal: {
    backgroundColor: Colors.BACKGROUND_COLOR_LESS_TRANSPARENT,
    justifyContent: 'center',
    height: "100%"
  },

  creationForm: {
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: 50,
    padding: 25,
    marginVertical: 100,
    marginHorizontal: 30,
    justifyContent: "center",
  }
});

export default MapScreen;
