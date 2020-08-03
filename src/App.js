import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import Axios from 'axios';
import React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from './constants/Constants';
import { AuthContext } from './context/Contexts';
import AuthNavigator from './navigators/AuthNavigator';
import MainAppNavigator from './navigators/MainAppNavigator';

const App = () => {
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

  React.useEffect(() => {
    const fetchToken = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('authToken', () => {});
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: null });
    };

    fetchToken();
    dispatch({ type: 'FINISH_LOADING' });
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'START_LOADING' });
        await Axios.post(
          `${BASE_URL}/users/login`,
          {},
          {
            auth: {
              username: data.username,
              password: data.password,
            },
          },
        )
          .then((result) => {
            console.log(result.data);
            Toast.showWithGravity(
              result.data.message,
              Toast.LONG,
              Toast.CENTER,
            );
            AsyncStorage.setItem('authToken', result.data.token);
            dispatch({ type: 'SIGN_IN', token: result.data.token });
          })
          .catch((error) =>
            Toast.showWithGravity(
              error.response.data.message,
              Toast.LONG,
              Toast.BOTTOM,
            ),
          );
        dispatch({ type: 'FINISH_LOADING' });
      },
      signOut: async () => {
        dispatch({ type: 'START_LOADING' });
        await AsyncStorage.clear();
        dispatch({ type: 'SIGN_OUT' });
        dispatch({ type: 'FINISH_LOADING' });
      },
      signUp: async (data) => {
        dispatch({ type: 'START_LOADING' });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Spinner
          visible={state.isLoading}
          textContent="Loading..."
          textStyle={styles.loadingText}
          size="large"
        />
        {state.userToken == null ? <AuthNavigator /> : <MainAppNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default App;
