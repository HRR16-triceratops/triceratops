import React, { Component, PropTypes } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

export default class SimpleExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Map center={this.props.pos ? this.props.pos : {lat: 50, lng: 40}} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={this.props.pos ? this.props.pos : {lat: 50, lng: 40}} draggable={this.props.draggable}>
        </Marker>
      </Map>
    );
  }
}
