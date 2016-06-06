import React, {PropTypes, Component} from 'react';
import {GoogleMapLoader, GoogleMap, Marker, SearchBox } from "react-google-maps";
import helper from '../services/helper.js';

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  handlePlacesChanged() {
    const places = this.place.getPlaces();
    const markers = [];

    // Add a marker for each place returned from search bar
    places.forEach(function (place) {
      markers.push({
        position: place.geometry.location,
      });
    });

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.props.center;
    const center = {
      lat: mapCenter.lat(),
      lng: mapCenter.lng()
    };
    this.props.setMapCenter(center);
    this.props.setMarkerCenter(center);
  }

  handleDragEnd() {
    const markerCenter = this.marker.getPosition();
    const center = {
      lat: markerCenter.lat(),
      lng: markerCenter.lng()
    };
    this.props.setMapCenter(center);
    this.props.setMarkerCenter(center);
  }

  componentWillMount() {
    if(this.props.findGeolcation) {
      helper.geoFindMe((data) => {
        let center = {
          lat: data.coords.latitude,
          lng: data.coords.longitude
        };
        this.props.setMapCenter(center);
      });
    }
  }

  render() {
    return (
      <section style={{height: "100%"}}>
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={(node) => {
                this.map = node;
              }}
              defaultZoom={12}
              center={this.props.center}
              onChange={(x) => console.log(x)}
            >
            {this.props.searchBox &&
              <SearchBox
                ref={(node) => {
                  this.place = node;
                }}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={this.handlePlacesChanged.bind(this)}
                classes="map-searchbox"
                placeholer="heyhey"
              />
            }
              <Marker
                ref={node => this.marker = node}
                position={this.props.draggable ? this.props.center.marker : this.props.center}
                draggable={this.props.draggable}
                onDragend={this.handleDragEnd.bind(this)}
              />
            </GoogleMap>
          }
        />
      </section>
    );
  }
}
