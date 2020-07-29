import React, {Component} from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Colors from '../constants/Colors';
class LoginForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
        />

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          returnKeyType="go"
          ref={(input) => this.passwordInput = input}
        />

        <TouchableOpacity style={styles.loginButton} onPress={() => console.log("pressed")}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  continer: {
    padding: 20,
    backgroundColor: Colors.CONTAINER_BACKGROUND_COLOR,
    borderRadius: 20
  },

  input: {
    backgroundColor: Colors.TEXT_INPUT_BACKROUND_COLOR,
    color: 'white',
    fontSize: 24,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 30,
    marginBottom: 15,
  },

  loginButton: {
      backgroundColor: Colors.BUTTON_BACKGROUND_COLOR,
      borderRadius: 10,
      paddingHorizontal: 20,
      marginHorizontal: 30,
      marginBottom: 15,
      alignItems: 'center',
      paddingVertical: 7 
  },

  loginText: {
      fontSize: 24,
      fontWeight: '300',
      color: Colors.BUTTON_TEXT_COLOR
  }
});

export default LoginForm;
