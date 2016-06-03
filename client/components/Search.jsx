import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

export default class SearchCompoenet extends Component {

  render() {
    const {fields: {search}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.search.bind(this))}>
        <TextField className="navSearch" name="search" hintText="Search..." {...search}/>
      </form>
    );
  }
}
