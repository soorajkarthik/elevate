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
        currLocation && this.animateToPoint(currLocation.latitude, currLocation.longitude);
    };

    resetRotation = () => {
        this.map.animateToBearing(0, 1000);
    };

    markerPressed(alert) {
        this.context.dispatch({ type: 'MARKER_CLICKED', alert: alert });
        this.animateToPoint(alert["latitude"], alert["longitude"]);
    }

    animateToPoint(lat, long) {
        this.map.animateToRegion(
            {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
            }, 1000
        );
    }

    render() {
        return (
            <View style={ this.props.style }>
                <MapView
                    style={ styles.map }
                    provider={ PROVIDER_GOOGLE }
                    showsCompass={ false }
                    showsMyLocationButton={ false }
                    showsUserLocation={ true }
                    followsUserLocation={ true }
                    moveOnMarkerPress={ false }
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
                                onPress={ () => this.markerPressed(alert) }
                                onSelect={ () => this.markerPressed(alert) }
                            />;
                        })
                    }
                </MapView>
                <TouchableOpacity
                    style={ { ...styles.overlayButton, right: 60 } }
                    onPress={ this.resetRotation }
                >
                    <Image source={ require("../assets/compassIcon.png") } style={ styles.icon } />
                </TouchableOpacity>
                <TouchableOpacity
                    style={ { ...styles.overlayButton, right: 20 } }
                    onPress={ this.centerUser }
                >
                    <Image source={ require("../assets/centerIcon.png") } style={ styles.icon } />
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
        backgroundColor: Colors.ACCENT_COLOR_MORE_TRANSPARENT,
        position: 'absolute',
        top: 20,
    },

    icon: {
        maxWidth: 30,
        maxHeight: 30,
        tintColor: Colors.BUTTON_ICON_COLOR,
        opacity: 1,
    },
});

export default MyMap;
