import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { BACKGROUND_COLOR } from '../constants/Colors';

class MyStatusBar extends Component {
  render() {
    return (
      <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />
    );
  }
}

export default MyStatusBar;
