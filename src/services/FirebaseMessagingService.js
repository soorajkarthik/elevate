import notifee, {
  AndroidImportance,
  AndroidStyle,
  IOSAuthorizationStatus,
} from '@notifee/react-native';
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
    Alert.alert(remoteMessage.data.title, remoteMessage.data.message, [
      { text: 'Ok', style: 'cancel' },
    ]);
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    if (
      (await notifee.requestPermission()).authorizationStatus <
      IOSAuthorizationStatus.AUTHORIZED
    ) {
      return;
    }

    let channelId = await notifee.createChannel({
      id: 'alerts',
      name: 'Elevate Alerts',
    });

    await notifee.displayNotification({
      title: `<h1>${ remoteMessage.data.title }</h1>`,
      subtitle: '\u26A0\uFE0F',
      body: remoteMessage.data.message,
      android: {
        channelId,
        sound: 'default',
        importance: AndroidImportance.HIGH,
        showTimestamp: true,
        smallIcon: 'ic_launcher_round',
        style: { type: AndroidStyle.BIGTEXT, text: remoteMessage.data.message },
        vibrationPattern: [1500, 200, 1500, 200, 1500, 200],
      },
      ios: {
        critical: true,
        criticalVolume: 1,
      },
    });
  });

  notifee.onBackgroundEvent(async (event) => {
    console.log(event);
  });
};
