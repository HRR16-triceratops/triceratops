import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, Route, IndexRoute, Link, History } from "react-router";
import NavComponent from './nav.jsx';

console.log('Search page loaded!');

var SearchComponent = React.createClass({
        render: function() {
          return (
            <div>
               {/*<NavComponent  />*/}
            <div className="newShare">
              <h1>This is a search page</h1>
              <ul role="nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/user">User</Link></li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/share">Share</Link></li>
             </ul>
            </div>
            </div>
          );
        }
      });

export default SearchComponent; 