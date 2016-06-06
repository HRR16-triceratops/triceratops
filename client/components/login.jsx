import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookLogin from 'react-facebook-login';
import Dialog from 'material-ui/Dialog';

const style = {
  margin: 12,
}

export default class LoginComponent extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: getMuiTheme()};
  }

  render() {
    const {fields: {username, password}, handleSubmit, ui, popupClose } = this.props;
    return (
      <div>
        <div class="well bs-component">
          <form onSubmit={handleSubmit(this.props.makeLoginRequest.bind(this))} class="form-horizontal">
            <fieldset>
              <legend>Login</legend>
              <div class="form-group">
                <div class="col-md-10">
                  <TextField type="text" className="loginInput" id="inputUsername" placeholder="Username" {...username}/>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-10">
                  <TextField type="password" autocomplete="off" id="inputPassword" placeholder="Password" {...password}/>
                </div>
              </div>
              <RaisedButton className="button" type="submit" label="Login" />
              <Link to="/signup">
                <RaisedButton className="button" label="Signup" />
              </Link>
            </fieldset>
          </form>
          <FacebookLogin
          appId="1734027273476564"
          autoLoad={false}
          callback={this.props.loginWithFB}
          scope="public_profile, email"
          fields="name, email"
          cssClass="fb-button"
          />
          <Dialog
            actions={
              <FlatButton
                label="OK"
                primary={true}
                onClick={popupClose}
              />
            }
            modal={false}
            open={ui.popup.open}
            onRequestClose={popupClose}
          >
            {ui.popup.content}
          </Dialog>
        </div>
      </div>
    );
  }
}
