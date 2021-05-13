import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Linking } from 'react-native';
import { AppContext } from '../context/Context';
import * as Colors from "../constants/Colors";

class AlertDetailView extends Component {
    static contextType = AppContext;

    // use haversine formula to calculate straight line distance
    calculateDistance(focusedAlert, userLocation) {

        const lat1 = focusedAlert["latitude"];
        const long1 = focusedAlert["longitude"];
        const lat2 = userLocation["latitude"];
        const long2 = userLocation["longitude"];


        const R = 3958.8; // radius of earth in miles
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (long2 - long1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    linkToEmail(alert) {
        let url = `mailto:${ alert["userInfo"]["email"] }?subject=Re: ${ alert["alertType"]["name"] } Alert on Elevate`;
        if (Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
    }

    linkToPhone(alert) {
        let url = `tel:${ alert["userInfo"]["phone"] }`;
        if (Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
    }

    linkToAddress(alert) {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${ alert["latitude"] },${ alert["longitude"] }`;
        const label = alert["place"];

        const url = Platform.select({
            ios: `${ scheme }${ label }@${ latLng }`,
            android: `${ scheme }${ latLng }(${ label })`
        });


        if (Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
    }

    render() {
        let focusedAlert = this.context.getState().focusedAlert;

        if (focusedAlert) {
            let userInfo = focusedAlert["userInfo"];
            let distance = this.calculateDistance(focusedAlert, this.context.getState().location);

            return (
                <View style={ this.props.style }>
                    <ScrollView >
                        <Text style={ styles.detailText }>Created By: { userInfo["name"] }</Text>
                        {
                            userInfo["email"] ? (
                                <Text style={ styles.detailText }>
                                    Email: <Text style={ styles.linkText } onPress={ () => this.linkToEmail(focusedAlert) }>
                                        { userInfo["email"] }
                                    </Text>
                                </Text>
                            ) : null
                        }
                        {
                            userInfo["phone"] ? (
                                <Text style={ styles.detailText }>
                                    Phone: <Text style={ styles.linkText } onPress={ () => this.linkToPhone(focusedAlert) }>
                                        { userInfo["phone"] }
                                    </Text>
                                </Text>
                            ) : null
                        }
                        <Text style={ styles.detailText }>
                            { `${ focusedAlert["alertType"]["name"] } ${ distance.toFixed(1) } miles away at ` }
                            <Text style={ styles.linkText } onPress={ () => this.linkToAddress(focusedAlert) }>
                                { focusedAlert["place"] }
                            </Text>
                        </Text>
                        <Text style={ styles.detailText }>Description: { focusedAlert["description"] }</Text>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={ this.props.style }>
                    <Text style={ styles.promptText }>Click on an alert marker on the map to view more details!</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    detailText: {
        fontSize: 17.25,
        fontWeight: "300",
        color: Colors.LIGHT_TEXT_COLOR
    },

    linkText: {
        textDecorationLine: "underline",
        color: Colors.LIGHT_LINK_COLOR
    },

    promptText: {
        fontSize: 17.25,
        fontWeight: "300",
        color: Colors.LIGHT_TEXT_COLOR
    }
});

export default AlertDetailView;
