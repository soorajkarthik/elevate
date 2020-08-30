import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Colors from '../constants/Colors';
import { AppContext } from '../context/Context';

class PasswordResetForm extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  async requestReset() {
    if (await this.context.passwordReset(String(this.state.email))) {
      this.setState({ email: '' });
      this.props.navigation.navigate('Login');
    } else this.emailInput.focus();
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER_COLOR}
          value={this.state.email}
          onChangeText={(edited) => this.setState({ email: edited })}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="go"
          onSubmitEditing={() => this.requestReset()}
          ref={(input) => (this.emailInput = input)}
        />

        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => this.requestReset()}>
          <Text style={styles.requestText}>Send reset link</Text>
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

  requestButton: {
    backgroundColor: Colors.ACCENT_COLOR,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    marginBottom: 15,
    alignItems: 'center',
    paddingVertical: 7,
  },

  requestText: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.BUTTON_TEXT_COLOR,
  },
});

export default PasswordResetForm;
