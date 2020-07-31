import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {BACK_BUTTON_COLOR} from '../constants/Colors';
import LoginScreen from '../screens/LoginScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={headerOptions.mainScreen}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={headerOptions.childScreens}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={headerOptions.childScreens}
      />
    </Stack.Navigator>
  );
};

const headerOptions = {
  mainScreen: {
    headerShown: false,
  },

  childScreens: {
    headerTitle: '',
    headerTransparent: true,
    headerTintColor: BACK_BUTTON_COLOR,
  },
};

export default AuthNavigator;
