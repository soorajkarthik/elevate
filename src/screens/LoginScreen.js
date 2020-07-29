import React, {Component} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {CONTAINER_BACKGROUND_COLOR} from '../constants/Colors';
import LoginForm from '../components/LoginForm';

class LoginScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <StatusBar barStyle="light-content" />
        <Animatable.View style={styles.logoContainer} animation="bounceInDown" duration={3000}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </Animatable.View>
        <Animatable.View
          style={styles.formContainer}
          animation="bounceInUp"
          delay={200}
          duration={1500}
          easing="ease-in-cubic">
          <LoginForm />
        </Animatable.View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },

  logoContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 550,
    height: 100,
  },

  formContainer: {
    flex: 4,
    paddingTop: 100,
    backgroundColor: CONTAINER_BACKGROUND_COLOR,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default LoginScreen;
