import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MySpinner from './components/MySpinner';
import { AppContext, useAppContext } from './context/Context';
import { firebaseCredentials } from './Environment';
import AuthNavigator from './navigators/AuthNavigator';
import MainAppNavigator from './navigators/MainAppNavigator';
import useFirebaseMessaging from './services/FirebaseMessagingService';
import useBackgroundGeolocation from './services/LocationService';
import { useStateManager } from './state/State';

const App = () => {
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
        userToken = await AsyncStorage.getItem('authToken', () => { });
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'SIGN_IN', token: userToken });
    };

    fetchToken();
    dispatch({ type: 'FINISH_LOADING' });
  }, []);

  React.useEffect(() => {
    useBackgroundGeolocation(state.userToken, dispatch);
    useFirebaseMessaging(state.userToken);
  }, [state.userToken]);

  return (
    <AppContext.Provider value={ useAppContext(state, dispatch) }>
      <NavigationContainer>
        <MySpinner isLoading={ state.isLoading } />
        { state.userToken == null ? <AuthNavigator /> : <MainAppNavigator /> }
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
