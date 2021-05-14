import React, { Component } from 'react';
import { StyleSheet, View, TextInput, FlatList } from 'react-native';
import { AppContext } from '../context/Context';
import DelayInput from "react-native-debounce-input";
import * as Colors from '../constants/Colors';

class PlaceSearchTextInput extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            results: '',
            isShowingResults: false
        };
    }

    render() {
        return (
            <View>
                <DelayInput
                    style={ this.props.style }
                    ref={ this.props.ref }
                    delayTimeout={ 200 }
                    minLength={ 5 } />
                <FlatList />
            </View>
        );
    }
}

const styles = StyleSheet.create({
});

export default PlaceSearchTextInput;
