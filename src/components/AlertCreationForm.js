import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../context/Context';
import * as Colors from '../constants/Colors';

class AlertCreationForm extends Component {
    static contextType = AppContext;

    render() {
        return <View />;
    }
}

const styles = StyleSheet.create({
});

export default AlertCreationForm;
