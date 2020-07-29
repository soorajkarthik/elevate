import React, {Component} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {SimpleAnimation} from 'react-native-simple-animations';
import {CONTAINER_BACKGROUND_COLOR} from '../constants/Colors';
import LoginForm from '../components/LoginForm';

class LoginScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <SimpleAnimation>
          <View style={styles.formContainer}>
            <LoginForm />
          </View>
        </SimpleAnimation>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
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
