import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';

console.log('Login page loaded!');

var LoginComponent = React.createClass({
  render: function() {
    const handleSubmit = (e) => {
      let name = username.value;
      let pwd = password.value;
      e.preventDefault();
      this.props.makeLoginRequest.bind(this)({username: name, password: pwd})
        .then((resp) => {
          console.log(resp);
          let data = resp.payload.data;
          //if any one of these exist, then there is a field error
          if(resp.payload.status != 200) {
            //let other components know of error by updating the redux` state
            dispatch(actions.loginFailure(resp.payload));
            reject(data); //this is for redux-form itself
          } else {
            //store JWT Token to browser session storage
            //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
            //sessionStorage = persisted only in current tab
            sessionStorage.setItem('jwtToken', resp.payload.data.token);
            //let other components know that we got user and things are fine by updating the redux` state
            dispatch(actions.loginSuccess(resp.payload));
            resolve();//this is for redux-form itself
          }
        });
    };
    let username;
    let password;
    return (
      <div>
         <div class="well bs-component">
          <form onSubmit={handleSubmit} class="form-horizontal">
            <fieldset>
              <legend>Login</legend>
              <div class="form-group">
                <label for="inputUsername" class="col-md-2 control-label">Username</label>

                <div class="col-md-10">
                  <input type="email" class="form-control" id="inputUsername" placeholder="Username" ref={(node) => {
                    username = node;
                  }}/>
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword" class="col-md-2 control-label">Password</label>

                <div class="col-md-10">
                  <input type="password" class="form-control" id="inputPassword" placeholder="Password" ref={(node) => {
                    password = node;
                  }}/>
                </div>
              </div>
              <button class="btn btn-success-outline" type="submit">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
});

export default LoginComponent;
