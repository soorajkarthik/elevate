import React, { Component } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MyStatusBar from '../components/MyStatusBar';
import PasswordResetForm from '../components/PasswordResetForm';
import * as Colors from '../constants/Colors';

class PasswordResetScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        <Animatable.View
          style={styles.headerContainer}
          animation="fadeInDown"
          duration={2000}>
          <Image
            style={styles.logo}
            source={require('../assets/logoPlain.png')}
          />
          <Text style={styles.text}>
            Lets get you a new password! Just enter your email and we'll send
            you a link to reset your password.
          </Text>
        </Animatable.View>
        <KeyboardAvoidingView
          style={styles.formContainerWrapper}
          behavior="padding"
          keyboardVerticalOffset={Platform.select({
            ios: () => 0,
            android: () => -500,
          })()}>
          <Animatable.View
            style={styles.formContainer}
            animation="bounceInUp"
            delay={200}
            duration={3000}>
            <PasswordResetForm />
          </Animatable.View>
        </KeyboardAvoidingView>
      </View>
    );
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

export default PasswordResetScreen;
