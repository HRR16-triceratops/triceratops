import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, Route, IndexRoute, Link, History } from "react-router";

console.log('User page loaded!');

var UserComponent = React.createClass({
        render: function() {
          return (
            <div>
              <div className="user">
                <h1>This is a user page</h1>
              </div>
            </div>
          );
        }
      });

export default UserComponent; 