import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

var SignupComponent = React.createClass({
  render: function() {
    const {fields: {username, email, password}, handleSubmit, ui, generalPopupClose} = this.props;
    return (
      <div>
         <div class="well bs-component">
          <form onSubmit={handleSubmit(this.props.makeSignupRequest.bind(this))} class="form-horizontal" autocomplete="off">
            <fieldset>
              <legend>Sign Up</legend>
              <div class="form-group">
                <div class="col-md-10">
                  <TextField id="inputUsername" placeholder="Username" {...username}/>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-10">
                  <TextField type="email" id="inputEmail" placeholder="Email" {...email}/>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-10">
                  <TextField type="password" class="form-control" id="inputPassword" placeholder="Password" {...password}/>
                </div>
              </div>
              <RaisedButton class="btn btn-success-outline" type="submit" label="Sign Up" />
            </fieldset>
          </form>
          <Dialog
            actions={
              <FlatButton
                label="OK"
                primary={true}
                onClick={generalPopupClose}
              />
            }
            modal={false}
            open={ui.generalPopup.open}
            onRequestClose={generalPopupClose}
          >
            {ui.generalPopup.content}
          </Dialog>
        </div>
      </div>
    );
  }
});

export default SignupComponent;
