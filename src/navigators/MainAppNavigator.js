import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { BACKGROUND_COLOR } from '../constants/Colors';
import { AppContext } from '../context/Context';
import TempScreen from '../screens/TempScreen';
import HomeScreenNavigator from './HomeScreenNavigator';

class MainAppNavigator extends Component {
  static contextType = AppContext;

  render() {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator
        drawerType="front"
        openByDefault={true}
        edgeWidth={100}
        backBehavior="history"
        drawerStyle={styles.drawer}
        drawerContent={this.drawerContent}>
        <Drawer.Screen name="Home" component={HomeScreenNavigator} />
        <Drawer.Screen name="Profile" component={TempScreen} />
      </Drawer.Navigator>
    );
  }

  drawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props} style={styles.drawerView}>
        <DrawerItemList {...props} />
        <DrawerItem label="Sign Out" onPress={this.signOutAlert} />
      </DrawerContentScrollView>
    );
  };

  signOutAlert = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => this.context.signOut(),
      },
    ]);
  };
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: BACKGROUND_COLOR,
    width: '60%',
  },

  drawerView: {
    paddingVertical: 25,
    paddingHorizontal: 12.5,
  },
});

export default MainAppNavigator;
