import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, Route, IndexRoute, Link, History } from "react-router";

console.log('Login page loaded!');

var LoginComponent = React.createClass({
        render: function() {
          return (
            <div>
               <div class="well bs-component">
                <form class="form-horizontal">
                  <fieldset>
                    <legend>Signin</legend>
                    <div class="form-group">
                      <label for="inputEmail" class="col-md-2 control-label">Email</label>

                      <div class="col-md-10">
                        <input type="email" class="form-control" id="inputEmail" placeholder="Email" />
                      </div>
                    </div>  
                    <div class="form-group">
                      <label for="inputPassword" class="col-md-2 control-label">Password</label>

                      <div class="col-md-10">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
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


