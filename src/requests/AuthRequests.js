import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../Environment';

export const signIn = async (data, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  await Axios.post(`${BASE_URL}/users/login`, {}, { auth: data })
    // Login successful
    .then((result) => {
      Toast.showWithGravity(result.data.message, Toast.LONG, Toast.CENTER);
      AsyncStorage.setItem('authToken', result.data.token);
      dispatch({ type: 'SIGN_IN', token: result.data.token });
    })
    // Login not successful
    .catch((error) =>
      Toast.showWithGravity(
        error.response.data.message,
        Toast.LONG,
        Toast.CENTER,
      ),
    );
  dispatch({ type: 'FINISH_LOADING' });
};

// Sign out the user
export const signOut = async (dispatch) => {
  dispatch({ type: 'START_LOADING' });
  await AsyncStorage.clear();
  dispatch({ type: 'SIGN_OUT' });
  dispatch({ type: 'FINISH_LOADING' });
};

// Sign up the user
export const signUp = async (data, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  let result = await Axios.post(`${BASE_URL}/users`, data)
    .then(() => {
      Alert.alert(
        'Account Created',
        'Your account has been created successfully! Please verify your email using the link we sent you.',
      );
      return true;
    })
    .catch((error) => {
      Toast.showWithGravity(
        error.response.data.message,
        Toast.LONG,
        Toast.CENTER,
      );
      return false;
    });
  dispatch({ type: 'FINISH_LOADING' });
  return result;
};

// Send password reset email
export const passwordReset = async (email, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  let result = await Axios.get(`${BASE_URL}/users/pwordReset?email=${email}`)
    .then((result) => {
      Toast.showWithGravity(result.data.message, Toast.LONG, Toast.CENTER);
      return true;
    })
    .catch((error) => {
      Toast.showWithGravity(
        error.response.data.message,
        Toast.LONG,
        Toast.CENTER,
      );
      return false;
    });
  dispatch({ type: 'FINISH_LOADING' });
  return result;
};
