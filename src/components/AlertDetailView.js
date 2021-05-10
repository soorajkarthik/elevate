import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppContext } from '../context/Context';

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

    render() {
        let focusedAlert = this.context.getState().focusedAlert;

        if (focusedAlert) {
            let userInfo = focusedAlert["userInfo"];
            let distance = this.calculateDistance(focusedAlert, this.context.getState().location);

            return (
                <View style={ { ...this.props.style, ...styles.container } }>
                    <Text>Created By: { userInfo["name"] }</Text>
                    {userInfo["email"] ? <Text>Email: { userInfo["email"] }</Text> : null }
                    {userInfo["phone"] ? <Text>Phone: { userInfo["phone"] }</Text> : null }
                    <Text>{ focusedAlert["alertType"]["name"] } { distance.toFixed(1) } miles away:</Text>
                    <Text>{ focusedAlert["description"] }</Text>
                    <Text>Address: { focusedAlert["place"] }</Text>
                </View>
            );
        } else {
            return (
                <View style={ { ...this.props.style, ...styles.container } }>
                    <Text style={ styles.promptText }>Click on an alert marker on the map to view more details!</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    promptText: {
        fontSize: 20,
        fontWeight: "300",
        color: "#000"
    }
});

export default AlertDetailView;
