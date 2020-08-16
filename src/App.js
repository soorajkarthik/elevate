import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import Axios from 'axios';
import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from './constants/Values';
import { AppContext } from './context/Contexts';
import AuthNavigator from './navigators/AuthNavigator';
import MainAppNavigator from './navigators/MainAppNavigator';

const App = () => {
  // Manage state
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'START_LOADING':
          return {
            ...prevState,
            isLoading: true,
          };
        case 'FINISH_LOADING':
          return {
            ...prevState,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  // Try and get user auth token from AsyncStorage
  // If its stored, skip to main screen
  React.useEffect(() => {
    const fetchToken = async () => {
      let userToken = null;

      try {
        userToken = await AsyncStorage.getItem('authToken', () => {});
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    fetchToken();
    dispatch({ type: 'FINISH_LOADING' });
  }, []);

  // Context methods for auth
  const appContext = React.useMemo(
    () => ({
      // Sign in the user
      signIn: async (data) => {
        dispatch({ type: 'START_LOADING' });
        await Axios.post(`${BASE_URL}/users/login`, {}, { auth: data })
          // Login successful
          .then((result) => {
            Toast.showWithGravity(
              result.data.message,
              Toast.LONG,
              Toast.CENTER,
            );
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
      },

      // Sign out the user
      signOut: async () => {
        dispatch({ type: 'START_LOADING' });
        await AsyncStorage.clear();
        dispatch({ type: 'SIGN_OUT' });
        dispatch({ type: 'FINISH_LOADING' });
      },

      // Sign up the user
      signUp: async (data) => {
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
      },

      // Send password reset email
      passwordReset: async (email) => {
        dispatch({ type: 'START_LOADING' });
        let result = await Axios.get(
          `${BASE_URL}/users/pwordReset?email=${email}`,
        )
          .then((result) => {
            Toast.showWithGravity(
              result.data.message,
              Toast.LONG,
              Toast.CENTER,
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
      },
    }),
    [],
  );

  return (
    <AppContext.Provider value={appContext}>
      <NavigationContainer>
        <Spinner
          visible={state.isLoading}
          textContent="Loading..."
          textStyle={styles.loadingText}
          size="large"
        />
        {state.userToken == null ? <AuthNavigator /> : <MainAppNavigator />}
      </NavigationContainer>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default App;
