import messaging from '@react-native-firebase/messaging';
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
};
