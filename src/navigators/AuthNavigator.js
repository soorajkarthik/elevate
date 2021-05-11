import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BUTTON_ICON_COLOR } from '../constants/Colors';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Login"
        component={ SignInScreen }
        options={ headerOptions.mainScreen }
      />
      <Stack.Screen
        name="SignUp"
        component={ SignUpScreen }
        options={ headerOptions.childScreens }
      />
      <Stack.Screen
        name="PasswordReset"
        component={ PasswordResetScreen }
        options={ headerOptions.childScreens }
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
    headerTintColor: BUTTON_ICON_COLOR,
  },
};

export default AuthNavigator;
