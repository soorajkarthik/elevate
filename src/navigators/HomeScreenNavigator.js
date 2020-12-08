import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR } from '../constants/Colors';
import TempScreen from '../screens/TempScreen';
import MapScreen from '../screens/MapScreen';

const Tabs = createMaterialTopTabNavigator();

const HomeScreenNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{ style: styles.navigator }}
      backBehavior="none">
      <Tabs.Screen name="Map" component={MapScreen} />
      <Tabs.Screen name="Temp1" component={TempScreen} />
      <Tabs.Screen name="Temp2" component={TempScreen} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: BACKGROUND_COLOR,
  },
});

export default HomeScreenNavigator;
