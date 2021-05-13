import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { Alert } from 'react-native';
import { BASE_URL, DEBUG } from '../Environment';

export default useBackgroundGeolocation = (authToken, dispatch) => {
  if (authToken == null) {
    return;
  }

  BackgroundGeolocation.removeAllListeners();

  BackgroundGeolocation.configure({
    locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 200,
    debug: DEBUG,
    distanceFilter: 300,
    stopOnTerminate: false,
    startOnBoot: true,
    interval: 60000,
    fastestInterval: 30000,
    activitiesInterval: 10000,
    stopOnStillActivity: false, // app crashes when true, but end goal is to get it to work with true
    notificationsEnabled: DEBUG,
    saveBatteryOnBackground: true,
    url: `${ BASE_URL }/users/location`,
    httpHeaders: {
      Authorization: `Bearer ${ authToken }`,
    },
    postTemplate: {
      latitude: '@latitude',
      longitude: '@longitude',
    },
    maxLocations: 1000,
  });

  BackgroundGeolocation.on('location', (location) => {
    if (DEBUG) {
      console.log(
        `[INFO] Location update received: lat: ${ location.latitude }, lng: ${ location.longitude }`,
      );
    }

    dispatch({ type: 'LOCATION_UPDATE', location: location });
  });

  BackgroundGeolocation.on('background', () => {
    console.log('[INFO] App is in background');
    BackgroundGeolocation.configure({
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
    });
  });

  BackgroundGeolocation.on('foreground', () => {
    console.log('[INFO] App is in foreground');
    BackgroundGeolocation.configure({
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    });
  });

  if (DEBUG) {
    BackgroundGeolocation.on('start', () =>
      console.log('[INFO] BackgroundGeolocation service has started'),
    );

    BackgroundGeolocation.on('stop', () =>
      console.log('[INFO] BackgroundGeolocation service has stopped'),
    );

    BackgroundGeolocation.on('error', (error) =>
      console.log(`[ERROR] BackgroundGeolocation error: ${ error }`),
    );
  }

  BackgroundGeolocation.on('authorization', (status) => {
    console.log(`[INFO] BackgroundGeolocation authorization status: ${ status }`);
    if (status !== BackgroundGeolocation.AUTHORIZED) {
      setTimeout(
        () =>
          Alert.alert(
            'Elevate requires location tracking permission',
            'Would you like to open app settings?',
            [
              {
                text: 'Yes',
                onPress: () => BackgroundGeolocation.showAppSettings(),
              },
              {
                text: 'No',
                onPress: () => console.log('[INFO] Location Access Denied'),
                style: 'cancel',
              },
            ],
          ),
        1000,
      );
    }
  });

  BackgroundGeolocation.start();

  return cleanup;
};

const cleanup = () => {
  BackgroundGeolocation.removeAllListeners();
};
