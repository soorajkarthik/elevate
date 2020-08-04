import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Colors from '../constants/Colors';
import { AppContext } from '../context/Contexts';

class SignInForm extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  signIn() {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    this.context.signIn(data);
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          text={this.state.username}
          onChangeText={(edited) => this.setState({ username: edited })}
          onSubmitEditing={() => this.passwordInput.focus()}
        />

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          returnKeyType="go"
          text={this.state.password}
          onChangeText={(edited) => this.setState({ password: edited })}
          onSubmitEditing={() => this.signIn()} // Call login method
          ref={(input) => (this.passwordInput = input)}
        />

        <TouchableOpacity
          style={styles.passwordResetButton}
          onPress={() => this.props.navigation.navigate('PasswordReset')}>
          <Text style={styles.clickableText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.signIn()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.clickableText}>
            Don't have an account? Sign Up!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.TEXT_INPUT_BACKROUND_COLOR,
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 30,
    marginBottom: 15,
  },

  passwordResetButton: {
    padding: 5,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: '50%',
    marginRight: 30,
    alignItems: 'flex-end',
  },

  loginButton: {
    backgroundColor: Colors.ACCENT_COLOR,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    marginBottom: 15,
    alignItems: 'center',
    paddingVertical: 7,
  },

  loginText: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.BUTTON_TEXT_COLOR,
  },

  signUpButton: {
    padding: 10,
    marginBottom: 10,
    marginHorizontal: '10%',
    alignItems: 'center',
  },

  clickableText: {
    fontSize: 16,
    fontWeight: '200',
    color: Colors.BUTTON_TEXT_COLOR,
  },
});

export default SignInForm;
