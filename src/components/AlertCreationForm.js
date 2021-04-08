import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../context/Context';
import * as Animatable from 'react-native-animatable';
import * as Colors from '../constants/Colors';

class AlertCreationForm extends Component {
    static contextType = AppContext;

    render() {
        let focusedAlert = this.context.getState().focusedAlert;

        return (
            <Animatable.View
                style={ { ...this.props.style, ...styles.container } }
                animation="bounceInUp"
                duration={ 3000 }
            >
                {
                    focusedAlert ? (
                        <View />
                    ) : (
                        <Text>asdfasdf</Text>
                    )
                }
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        backgroundColor: Colors.PRIMARY_COLOR,
        height: "35%"
    }
});

export default AlertCreationForm;
