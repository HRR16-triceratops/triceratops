import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, Route, IndexRoute, Link, History } from "react-router";

var NavComponent = React.createClass({

  // ONCE STATE MANAGEMENT IS IN PLAY, ABLE TO TOGGLE ACTIVE STATE OF NAV ITEMS
  // componentDidMount: function(){
  //   const url = this.props.location.pathname; 
  // },

  // setActive: function(linkRoute){
  //   if (url === linkRoute) {
  //     return 
  //   }
  // }

  render: function() {
    return (
      <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Share Anything</Link>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to="/create">Create</Link></li>
            <li><Link to="/share">Share</Link></li>
            <li><Link to="/user">User</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/test">Test</Link></li>
          </ul>
        </div>
      </nav>
      {this.props.children}
      </div>
    );
  }
});

export default NavComponent; 

