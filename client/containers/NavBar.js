import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as actions from '../actions/index.js';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const styles = {
  mediumIcon: {
    width: 40,
    height: 40,
  },
  medium: {
    width: 42,
    height: 42,
    padding: 5
  }
};

class NavBar extends Component {

  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: getMuiTheme()};
  }

  render() {
    // const { store, history } = this.props
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <nav className="navbar navbar-light ">
          <Link to="/listings">
          <IconButton
            iconStyle={styles.mediumIcon}
            style={styles.medium}
            className="navbar-brand"
            href="/listings"
          ><ActionHome />
          </IconButton>
          </Link>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link to="/listings"><FlatButton label="Share"/></Link>
            </li>
            <li className="nav-item">
              <Link to="/create"><FlatButton label="Create"/></Link>
            </li>
            <li className="nav-item">
              <Link to="/profile"><FlatButton label="Profile"/></Link>
            </li>
            <li className="nav-item">
              <Link to="/manage"><FlatButton label="Manage"/></Link>
            </li>
            <li>
              <TextField className="navSearch" hintText="Search..." />
            </li>
            <li className="nav-item">
              {!isAuthenticated &&
                <Link to="/login"><FlatButton label="Login"/></Link>
              }
              {isAuthenticated &&
                <FlatButton onClick={this.props.logout} label="Logout"/>
              }
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.logOut());
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
// Root.propTypes = {
//   store: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired
// };
