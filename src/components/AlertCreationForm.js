import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/Context';
import * as Colors from '../constants/Colors';
import PlaceSearchTextInput from "../components/PlaceSearchTextInput";

class AlertCreationForm extends Component {
    static contextType = AppContext;

    createAlert = () => {

    };

    render() {
        return (
            <View style={ this.props.style }>
                <PlaceSearchTextInput style={ styles.input } resultsStyle={ styles.searchResults } />
                <View style={ styles.actionContainer }>
                    <TouchableOpacity
                        style={ styles.actionButton }
                        onPress={ this.props.closeFunction }>
                        <Text style={ styles.actionText }>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.actionButton }
                        onPress={ this.createAlert }>
                        <Text style={ styles.actionText }>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        marginHorizontal: 20,
    },

    actionButton: {
        backgroundColor: Colors.ACCENT_COLOR,
        borderRadius: 10,
        width: 100,
        marginHorizontal: 10,
        alignItems: 'center',
        paddingVertical: 7,
    },

    actionText: {
        fontSize: 20,
        fontWeight: '300',
        color: Colors.BUTTON_TEXT_COLOR,
    },

    input: {
        backgroundColor: Colors.TEXT_INPUT_BACKROUND_COLOR,
        color: Colors.LIGHT_TEXT_COLOR,
        fontSize: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 30,
        marginBottom: 15,
    },

    searchResults: {
        justifyContent: 'center',
        height: 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
        paddingHorizontal: 10,
        marginHorizontal: 30,
        borderRadius: 10
    }
});

export default AlertCreationForm;
