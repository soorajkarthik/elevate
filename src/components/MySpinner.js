import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet } from 'react-native';

class MySpinner extends Component {
  render() {
    return (
      <Spinner
        visible={this.props.isLoading}
        textContent="Loading..."
        textStyle={styles.loadingText}
        size="large"
      />
    );
  }
}

const styles = StyleSheet.create({
  loadingText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default MySpinner;
