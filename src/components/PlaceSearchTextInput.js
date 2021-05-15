import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, TextInput, ScrollView } from 'react-native';
import { AppContext } from '../context/Context';
import * as Colors from '../constants/Colors';
import { getAutoCompleteSuggestions } from '../requests/HereRequests';

class PlaceSearchTextInput extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            results: [],
            isShowingResults: false,
        };
    }

    updateSearch = (text) => {
        if (text !== this.state.search) {

            this.setState({ search: text });

            if (this.searchWaiting) {
                clearTimeout(this.searchWaiting);
            }

            this.searchWaiting = setTimeout(async () => {
                let results = await getAutoCompleteSuggestions(
                    text, this.context.getState().location
                );

                this.setState({
                    results: results,
                    isShowingResults: true,
                });
            }, 500);
        }
    };

    populateSearchBox = (item) => {
        this.setState({
            search: item.address,
            isShowingResults: false,
        });
    };

    render() {
        return (
            <View style={ { marginBottom: this.props.style.marginBottom } }>
                <TextInput
                    placeholder={ "Search for an Address" }
                    placeholderTextColor={ Colors.TEXT_INPUT_PLACEHOLDER_COLOR }
                    returnKeyType={ "search" }
                    style={ { ...this.props.style, marginBottom: 0 } }
                    ref={ this.props.inputRef }
                    onChangeText={ this.updateSearch }
                    onSubmitEditing={ this.props.onSubmitEditing }
                    value={ this.state.search } />
                { this.state.isShowingResults && (
                    <FlatList
                        keyExtractor={ (item) => item.id }
                        data={ this.state.results }
                        style={ styles.listContainer }
                        renderItem={ ({ item }) => (
                            <TouchableOpacity
                                onPress={ () => this.populateSearchBox(item) }
                                style={ this.props.resultsStyle }
                            >
                                <Text>{ item.address }</Text>
                            </TouchableOpacity>
                        ) }
                    />
                ) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        position: "absolute",
        width: "100%",
        top: 47,
        zIndex: 10
    }
});

export default PlaceSearchTextInput;
