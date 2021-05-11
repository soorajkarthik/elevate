import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { AppContext } from '../context/Context';
import { fetchAlertsViewport } from "../requests/AlertRequests";
import * as Colors from "../constants/Colors";

class MyMap extends Component {
    static contextType = AppContext;

    onRegionChangeComplete = (region) => {
        const authToken = this.context.getState().userToken;

        fetchAlertsViewport(authToken, region)
            .then((alerts) => this.context.dispatch({ type: 'FETCHED_ALERTS', alerts: alerts }));
    };

    centerUser = () => {
        let currLocation = this.context.getState().location;

        if (currLocation) {
            this.map.animateToRegion(
                {
                    latitude: currLocation.latitude,
                    longitude: currLocation.longitude,
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07
                }, 1000
            );
        }
    };

    showAlertCreationDialogue = () => {
        //do cool stuff here to show an alert creation dialogue
    };

    render() {
        return (
            <View style={ this.props.style }>
                <MapView
                    style={ styles.map }
                    provider={ PROVIDER_GOOGLE }
                    rotateEnabled={ false }
                    showsUserLocation={ true }
                    followsUserLocation={ true }
                    onMapReady={ this.centerUser }
                    onRegionChangeComplete={ this.onRegionChangeComplete }
                    ref={ (ref) => this.map = ref }
                >
                    {
                        this.context.getState().alerts.map((alert, index) => {
                            return <Marker
                                key={ index }
                                coordinate={ { latitude: alert["latitude"], longitude: alert["longitude"] } }
                                description={ alert["description"] }
                                title={ alert["alertType"]["name"] }
                                onPress={ () => this.context.dispatch({ type: 'MARKER_CLICKED', alert: alert }) }
                                onSelect={ () => this.context.dispatch({ type: 'MARKER_CLICKED', alert: alert }) }
                            />;
                        })
                    }
                </MapView>
                <TouchableOpacity
                    style={ { ...styles.overlayButton, ...styles.userLocationButton } }
                    onPress={ this.centerUser }
                >
                    <Image source={ require("../assets/centerIcon.png") } style={ styles.icon } />
                </TouchableOpacity>
                <TouchableOpacity
                    style={ { ...styles.overlayButton, ...styles.createButton } }
                    onPress={ this.showAlertCreationDialogue }
                >
                    <Image source={ require("../assets/addIcon.png") } style={ styles.icon } />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: 'center',
    },

    overlayButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Colors.ACCENT_COLOR_OPAQUE
    },

    icon: {
        maxWidth: 30,
        maxHeight: 30,
        tintColor: Colors.BUTTON_ICON_COLOR,
        opacity: 1,
    },

    userLocationButton: {
        position: 'absolute',
        top: 20,
        right: 60,
    },

    createButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    }
});

export default MyMap;
