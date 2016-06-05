import React from 'react';

export default class SearchBox extends React.Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    onPlacesChanged: React.PropTypes.func
  }
  render() {
    return <input className="search-input" ref="input" {...this.props} type="text"/>;
  }
  onPlacesChanged = () => {
    let place = this.searchBox.getPlaces();
    let pos = {
      lat: place[0].geometry.location.lat(),
      lng: place[0].geometry.location.lng()
    }
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(pos);
    }
  }
  componentDidMount() {
    var input = this.refs.input;
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }
}
