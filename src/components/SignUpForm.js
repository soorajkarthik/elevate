import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Toast from 'react-native-simple-toast';
import * as Colors from '../constants/Colors';
import { AppContext } from '../context/Context';

class SignUpForm extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      hasError: false,
      errorMessage: '',
    };
  }

  async signUp() {
    if (!this.validateFields()) return;

    const data = {
      name: `${this.state.firstName} ${this.state.lastName}`,
      email: this.state.email,
      password: this.state.password,
    };

    if (this.state.phone != '') data.phone = this.state.phone;

    if (await this.context.signUp(data))
      this.props.navigation.navigate('Login');
    else this.emailInput.focus();
  }

  validateFields() {
    if (this.state.firstName === '') {
      this.firstNameInput.focus();
      this.setState({
        hasError: true,
        errorMessage: 'Please enter your first name',
      });
      return false;
    }

    if (this.state.lastName === '') {
      this.lastNameInput.focus();
      this.setState({
        hasError: true,
        errorMessage: 'Please enter your last name',
      });
      return false;
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(this.state.email).toLowerCase())) {
      this.emailInput.focus();
      this.setState({
        hasError: true,
        errorMessage: 'Please a valid email address',
      });
      return false;
    }

    if (this.state.phone !== '' && !this.phoneInput.isValid) {
      this.setState({
        hasError: true,
        errorMessage:
          'Please enter a valid phone number or leave the field blank',
      });
      return false;
    }

    let passwordRegex = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(this.state.password)) {
      this.passwordInput.clear();
      this.confirmPasswordInput.clear();
      this.passwordInput.focus();
      this.setState({
        hasError: true,
        errorMessage:
          'Please enter a valid password. It must be least 8 characters long and must include at least one number and one special character.',
      });
      return false;
    } else if (this.state.password !== this.state.confirmPassword) {
      this.confirmPasswordInput.clear();
      this.confirmPasswordInput.focus();
      this.setState({
        hasError: true,
        errorMessage: 'Password does not match confirmation',
      });
      return false;
    }

    return true;
  }

  render() {
    return (
      <View>
        {this.state.hasError && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}

        <View style={styles.nameInputContainer}>
          <TextInput
            style={styles.nameInput}
            placeholder="First Name"
            placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
            value={this.state.firstName}
            onChangeText={(edited) => this.setState({ firstName: edited })}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => this.lastNameInput.focus()}
            ref={(input) => (this.firstNameInput = input)}
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Last Name"
            placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
            value={this.state.lastName}
            onChangeText={(edited) => this.setState({ lastName: edited })}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
            ref={(input) => (this.lastNameInput = input)}
          />
        </View>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          value={this.state.email}
          onChangeText={(edited) => this.setState({ email: edited })}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          ref={(input) => (this.emailInput = input)}
        />
        <TextInputMask
          type="custom"
          options={{
            mask: '+1 (999) 999-9999',
          }}
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Phone (Optional)"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          value={this.state.phone}
          onChangeText={(edited) => this.setState({ phone: edited })}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          ref={(input) => (this.phoneInput = input)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          value={this.state.password}
          onChangeText={(edited) => this.setState({ password: edited })}
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => this.confirmPasswordInput.focus()}
          ref={(input) => (this.passwordInput = input)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          value={this.state.confirmPassword}
          onChangeText={(edited) => this.setState({ confirmPassword: edited })}
          secureTextEntry
          returnKeyType="go"
          onSubmitEditing={() => this.signUp()}
          ref={(input) => (this.confirmPasswordInput = input)}
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => this.signUp()}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    color: Colors.ERROR_MESSAGE_COLOR,
    fontWeight: '200',
    fontSize: 17,
    marginBottom: 20,
    marginHorizontal: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },

  nameInputContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
  },

  nameInput: {
    backgroundColor: Colors.TEXT_INPUT_BACKROUND_COLOR,
    color: Colors.TEXT_INPUT_TEXT_COLOR,
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  input: {
    backgroundColor: Colors.TEXT_INPUT_BACKROUND_COLOR,
    color: Colors.TEXT_INPUT_TEXT_COLOR,
    fontSize: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 30,
    marginBottom: 15,
  },

  registerButton: {
    backgroundColor: Colors.ACCENT_COLOR,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    marginBottom: 15,
    alignItems: 'center',
    paddingVertical: 7,
  },

  registerText: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.BUTTON_TEXT_COLOR,
  },
});

export default SignUpForm;
