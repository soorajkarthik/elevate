import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { updateToken } from '../requests/FirebaseRequests';

export default useFirebaseMessaging = (authToken) => {
  messaging()
    .getToken()
    .then((deviceToken) => {
      return updateToken(deviceToken, authToken);
    });

  messaging().onTokenRefresh((deviceToken) => {
    updateToken(deviceToken, authToken);
  });

  messaging().onMessage(async (remoteMessage) => {
    console.log(remoteMessage);
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log(remoteMessage);
  });
};
