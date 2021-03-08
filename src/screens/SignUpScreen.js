import React, { Component } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MyStatusBar from '../components/MyStatusBar';
import SignUpForm from '../components/SignUpForm';
import * as Colors from '../constants/Colors';
import * as Constants from '../constants/Values';

class SignUpScreen extends Component {
  render() {
    return (
      <ScrollView style={ styles.container } endFillColor={ Colors.ACCENT_COLOR }>
        <MyStatusBar />
        <Animatable.View
          style={ styles.headerContainer }
          animation="fadeInDown"
          duration={ 2000 }>
          <Image style={ styles.logo } source={ require('../assets/banner.png') } />
          <Text style={ styles.text }>Lets get started!</Text>
        </Animatable.View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={ Platform.select({
            ios: () => Constants.IOS_KEYBOARD_PADDING,
            android: () => Constants.ANDROID_KEYBOARD_PADDING,
          })() }>
          <Animatable.View
            style={ styles.formContainer }
            animation="bounceInUp"
            delay={ 200 }
            duration={ 3000 }
            easing="ease">
            <SignUpForm navigation={ this.props.navigation } />
          </Animatable.View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUND_COLOR,
  },

  logo: {
    transform: [{ scale: 0.7 }],
    maxWidth: 400,
    maxHeight: 100,
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  text: {
    color: Colors.PRIMARY_COLOR,
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },

  formContainer: {
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: Colors.PRIMARY_COLOR,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default SignUpScreen;
