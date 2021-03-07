import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import MyMap from '../components/MyMap';
import { AppContext } from '../context/Context';

class MapScreen extends Component {
  static contextType = AppContext;

  render() {
    console.log(this.context.getState()   )
    return (
      <View style={styles.container}>
        <MyMap>
          {
            this.context.getState().alerts ? 
              this.context.getState().alerts.map((alert, index) => {
                <Marker
                  key={index}
                  coordinate={{ latitude: alert["latitude"], longitude: alert["longitude"] }}
                  title={alert["alertType"]["name"]}
                  description={alert["description"]}
                />
              }) :
              <View />
          }
        </MyMap>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
  },
});

export default MapScreen;
