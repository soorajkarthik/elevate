import notifee, { IOSAuthorizationStatus } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
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

    let channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: remoteMessage.data.title,
      subtitle: '\u26A0\uFE0F',
      body: remoteMessage.data.message,
      android: {
        channelId,
      },
    });
  });

  notifee.onBackgroundEvent(async (event) => {
    console.log(event);
  });
};
