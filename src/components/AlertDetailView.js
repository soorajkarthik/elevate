import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppContext } from '../context/Context';

class AlertDetailView extends Component {
    static contextType = AppContext;

    render() {
        let focusedAlert = this.context.getState().focusedAlert;

        return focusedAlert ? (
            <View style={ { ...this.props.style, ...styles.container } }>
                <Text></Text>
            </View>
        ) : (
            <View style={ { ...this.props.style, ...styles.container } }>
                <Text>Click on an alert marker on the map to view more details!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});

export default AlertDetailView;
