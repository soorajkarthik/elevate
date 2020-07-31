import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import TempHomeScreen from '../screens/TempHomeScreen';

const Tabs = createMaterialTopTabNavigator();

const MainAppNavigator = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Temp" component={TempHomeScreen} />
            <Tabs.Screen name="Temp1" component={TempHomeScreen} />
            <Tabs.Screen name="Temp2" component={TempHomeScreen} />
        </Tabs.Navigator>
    );
}

export default MainAppNavigator;