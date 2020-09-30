import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import { updateToken } from '../requests/FirebaseRequests';
import notifee, { IOSAuthorizationStatus } from '@notifee/react-native';
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
    Alert.alert(remoteMessage.data.title, remoteMessage.data.message, [
      { text: 'Ok', style: 'cancel' },
    ]);
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    if (
      Platform.OS == 'ios' &&
      (await notifee.requestPermission()).authorizationStatus <
        IOSAuthorizationStatus.AUTHORIZED
    ) {
      return;
    }

    notifee.displayNotification({
      title: remoteMessage.data.title,
      body: remoteMessage.data.message,
    });
  });
};
