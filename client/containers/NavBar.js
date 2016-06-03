import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as actions from '../actions/index.js';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import Face from 'material-ui/svg-icons/action/face';
import SearchContainer from './SearchContainer.js';

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
    // Refactor so that maps li-Link elements from an array of routes/Nav descriptions
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
              <Link to="/listings"><FlatButton label="Sharing"/></Link>
            </li>
            <li className="nav-item">
                <Link to="/manage"><FlatButton label="Dashboard"/></Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right" >
            <li>
              <SearchContainer />
            </li>
            <li className="nav-item navLogin">
              {!isAuthenticated &&
                <Link to="/login"><FlatButton label="Login"/></Link>
              }
              {isAuthenticated &&
                <FlatButton style={{marginTop:'14px'}} onClick={this.props.logout} label="Logout"/>
              }
            </li>
            <Link to="/profile">
              <IconButton
                className='navatar'
                iconStyle={styles.mediumIcon}
                style={styles.medium}
              >
              <Face />
              </IconButton>
            </Link>

          </ul>
        </nav>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      window.localStorage.setItem('jwtToken', '');
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
