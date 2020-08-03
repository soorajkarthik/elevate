import React, {Component} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MyStatusBar from '../components/MyStatusBar';
import SignInForm from '../components/SignInForm';
import * as Colors from '../constants/Colors';

class SignInScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        <Animatable.View
          style={styles.headerContainer}
          animation="fadeInDown"
          duration={2000}>
          <Image
            source={require('../assets/logoPlain.png')}
            style={styles.logo}
          />
          <Text style={styles.text}>Welcome back!</Text>
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
            duration={3000}
            easing="ease">
            <SignInForm navigation={this.props.navigation} />
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

  headerContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  logo: {
    transform: [{scale: 0.7}],
    maxWidth: 400,
    maxHeight: 100,
  },

  text: {
    color: Colors.PRIMARY_COLOR,
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },

  formContainerWrapper: {
    flex: 5,
  },

  formContainer: {
    height: '100%',
    paddingTop: 50,
    backgroundColor: Colors.PRIMARY_COLOR,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default SignInScreen;