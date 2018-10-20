import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Constants, MapView } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // 0.19.1

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      markers: [],
    };
  }

  componentDidMount() {
    this.fetchMarkerData();
  }

  setChange = () => {
    this.setState({text: this.state.text + '1'});
  }

  fetchMarkerData() {
    this.setState({isLoading: true});
    fetch('https://feeds.citibikenyc.com/stations/stations.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          markers: responseJson.stationBeanList, 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showMarkers() {
    if (this.state.isLoading) {
      return null
    }
    
    let markers = this.state.markers.map((marker, index) => {
     const coords = {
         latitude: marker.latitude,
         longitude: marker.longitude,
     };

     const metadata = `Status: ${marker.statusValue}`;

     return (
         <MapView.Marker
            key={index}
            coordinate={coords}
            title={marker.stationName}
            description={metadata}
         />
     );
    });
    return markers;
  }

  render() {
    return (
      <MapView
        style={{ flex: 0.5 }}
        region={{
          latitude: 40.76727216,
          longitude: -73.99392888,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
      }}>
      {this.showMarkers()}
    </MapView>
    );
  }
}
