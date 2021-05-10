import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { AppContext } from '../context/Context';

class MyMap extends Component {
    static contextType = AppContext;

    render() {
        return (
            <MapView
                style={ styles.map }
                pitchEnabled
                provider={ PROVIDER_GOOGLE }
                showsUserLocation={ true }
                followsUserLocation={ true }
            >
                {
                    this.context.getState().alerts.map((alert, index) => {
                        return <Marker
                            key={ index }
                            coordinate={ { latitude: alert["latitude"], longitude: alert["longitude"] } }
                            description={ alert["description"] }
                            title={ alert["alertType"]["name"] }
                            style={ styles.marker }
                            onPress={ () => this.context.dispatch({ type: 'MARKER_CLICKED', alert: alert }) }
                            onSelect={ () => this.context.dispatch({ type: 'MARKER_CLICKED', alert: alert }) }
                        />;
                    })
                }
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: 'center',
    },
});

export default MyMap;
