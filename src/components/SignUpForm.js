import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Colors from '../constants/Colors';

class SignUpForm extends Component {
  render() {
    return (
      <View>
        <View style={styles.nameInputContainer}>
          <TextInput
            style={styles.nameInput}
            placeholder="First Name"
            placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
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
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => this.phoneInput.focus()}
          ref={(input) => (this.emailInput = input)}
        />
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Phone (Optional)"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          ref={(input) => (this.phoneInput = input)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          secureTextEntry
          returnKeyType="go"
          onSubmitEditing={() => console.log('pressed')}
          ref={(input) => (this.passwordInput = input)}
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => console.log('pressed')}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameInputContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
  },

  nameInput: {
    backgroundColor: Colors.TEXT_INPUT_BACKROUND_COLOR,
    color: 'white',
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },

  input: {
    backgroundColor: Colors.TEXT_INPUT_BACKROUND_COLOR,
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 30,
    marginBottom: 15,
  },

  registerButton: {
    backgroundColor: Colors.BUTTON_BACKGROUND_COLOR,
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
