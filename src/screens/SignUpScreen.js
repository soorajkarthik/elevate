import React, {Component} from 'react';
import {
  Text,
  KeyboardAvoidingView,
  View,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Colors from '../constants/Colors';
import SignUpForm from '../components/SignUpForm';

class SignUpScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Animatable.View style={styles.headerContainer} animation="fadeInDown">
          <Image
            style={styles.logo}
            source={require('../assets/logoPlain.png')}
          />
          <Text style={styles.text}>Lets get started!</Text>
        </Animatable.View>
        <KeyboardAvoidingView
          styles={styles.formContainerWrapper}
          behavior="padding">
          <Animatable.View
            style={styles.formContainer}
            animation="bounceInUp"
            delay={200}
            duration={1500}
            easing="ease-in-cubic">
            <SignUpForm />
          </Animatable.View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },

  logo: {
    transform: [{scale: 0.7}],
    maxWidth: 400,
    maxHeight: 100,
  },

  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  text: {
    color: Colors.CONTAINER_BACKGROUND_COLOR,
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },

  formContainerWrapper: {
    flex: 2,
  },

  formContainer: {
    paddingVertical: 50,
    backgroundColor: Colors.CONTAINER_BACKGROUND_COLOR,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default SignUpScreen;
