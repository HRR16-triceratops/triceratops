import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { Link } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import FacebookLogin from 'react-facebook-login';

console.log('Login page loaded!');

export default class LoginComponent extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: getMuiTheme()};
  }

  render() {
    const {fields: {username, password}, handleSubmit} = this.props;
    return (
      <div>
        <div class="well bs-component">
          <form onSubmit={handleSubmit(this.props.makeLoginRequest.bind(this))} class="form-horizontal">
            <fieldset>
              <legend>Login</legend>
              <div class="form-group">
                <label for="inputUsername" class="col-md-2 control-label">Username</label>

                <div class="col-md-10">
                  <input type="text" class="form-control" id="inputUsername" placeholder="Username" {...username}/>
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword" class="col-md-2 control-label">Password</label>

                <div class="col-md-10">
                  <input type="password" class="form-control" id="inputPassword" placeholder="Password" {...password}/>
                </div>
              </div>
              <button class="btn btn-success-outline" type="submit">Login</button>
              <Link to="/signup">
                <FlatButton label="Signup" />
              </Link>
            </fieldset>
          </form>
          <FacebookLogin
          appId="1734027273476564"
          autoLoad={false}
          callback={this.props.loginWithFB}
          scope="public_profile, email"
          />
        </div>
      </div>
    );
  }
}
