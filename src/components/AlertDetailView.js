import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppContext } from '../context/Context';

class AlertDetailView extends Component {
    static contextType = AppContext;

    render() {
        return <View />;
    }
}

const styles = StyleSheet.create({
});

export default AlertDetailView;
