import React, {PropTypes, Component} from 'react';
import Marker from './Marker.js';

import GoogleMap from 'google-map-react';

export default class SimpleMapPage extends Component {
  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <GoogleMap
         bootstrapURLKeys={{
           key: 'AIzaSyCOQHHGcQGGgCWJPvOaMmy61P_1rXQgo7k',
           language: 'en',
         }}
        center={this.props.center}
        defaultZoom={this.props.zoom}
        onChange={(x,y,lat,lng,e) => console.log(x)}
        >
        <Marker lat={this.props.center.lat} lng={this.props.center.lng} text={'A'} />
      </GoogleMap>
    );
  }
}
