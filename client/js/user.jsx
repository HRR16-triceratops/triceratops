import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, Route, IndexRoute, Link, History } from "react-router";
import NavComponent from './nav.jsx';

console.log('User page loaded!');

var UserComponent = React.createClass({
        render: function() {
          return (
            <div>
              {/*<NavComponent  />*/}
            <div className="user">
              <h1>This is a user page</h1>
              
            </div>
            </div>
          );
        }
      });

export default UserComponent; 