import React, { Component } from 'react';
import { Alert } from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { BASE_URL } from '../constants/Values';

export default useBackgroundGeolocation = (debug, authToken) => {
  if (authToken == null) {
    cleanup();
    return;
  }

  BackgroundGeolocation.configure({
    locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 100,
    debug: debug,
    distanceFilter: 100,
    stopOnTerminate: false,
    startOnBoot: true,
    interval: 30000,
    fastestInterval: 15000,
    activitiesInterval: 2000,
    stopOnStillActivity: false,
    notificationsEnabled: debug,
    saveBatteryOnBackground: true,
    url: `${BASE_URL}/users/location`,
    httpHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
    postTemplate: {
      latitude: '@latitude',
      longitude: '@longitude',
    },
    maxLocations: 1,
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

  if (debug) {
    BackgroundGeolocation.on('start', () =>
      console.log('[INFO] BackgroundGeolocation service has started'),
    );

    BackgroundGeolocation.on('stop', () =>
      console.log('[INFO] BackgroundGeolocation service has stopped'),
    );

    BackgroundGeolocation.on('error', (error) =>
      console.log(`[ERROR] BackgroundGeolocation error: ${error}`),
    );

    BackgroundGeolocation.on('location', (location) =>
      console.log(
        `[INFO] Location update received: lat: ${location.latitude}, lng: ${location.latitude}`,
      ),
    );
  }
  BackgroundGeolocation.on('authorization', (status) => {
    console.log(`[INFO] BackgroundGeolocation authorization status: ${status}`);
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
