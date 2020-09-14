import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MySpinner from './components/MySpinner';
import { AppContext, useAppMethods } from './context/Context';
import AuthNavigator from './navigators/AuthNavigator';
import MainAppNavigator from './navigators/MainAppNavigator';
import useFirebaseMessaging from './services/FirebaseMessagingService';
import useBackgroundGeolocation from './services/LocationService';
import { useStateManager } from './state/State';
import firebase from '@react-native-firebase/app';

const App = () => {
  const firebaseCredentials = {
    apiKey: 'AIzaSyCDWgGqHuhUlna7C3ykPyDKZbvOFnqVjBE',
    authDomain: 'elevate-community.firebaseapp.com',
    databaseURL: 'https://elevate-community.firebaseio.com',
    projectId: 'elevate-community',
    storageBucket: 'elevate-community.appspot.com',
    messagingSenderId: '216169060889',
    appId: '1:216169060889:web:f5d79d9661982d05826888',
    measurementId: 'G-E0HSM2933W',
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseCredentials);
  }

  // Manage state
  const [state, dispatch] = useStateManager();

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
      dispatch({ type: 'SIGN_IN', token: userToken });
    };

    fetchToken();
    dispatch({ type: 'FINISH_LOADING' });
  }, []);

  React.useEffect(() => {
    useBackgroundGeolocation(state.userToken);
    useFirebaseMessaging(state.userToken);
  }, [state.userToken]);

  return (
    <AppContext.Provider value={useAppMethods(dispatch)}>
      <NavigationContainer>
        <MySpinner isLoading={state.isLoading} />
        {state.userToken == null ? <AuthNavigator /> : <MainAppNavigator />}
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
