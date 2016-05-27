import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, Route, IndexRoute, Link, History } from "react-router";

var NavComponent = React.createClass({
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
          </ul>
            <form class="form-inline pull-xs-right">
              <input class="form-control" type="text" placeholder="Search"></input>
              <button class="btn btn-success-outline" type="submit">Search</button>
            </form>
          <ul className="nav navbar-nav">
            <li><Link to="/user">User</Link></li>
          </ul>
        </div>
      </nav>
      {this.props.children}
      </div>
    );
  }
});

export default NavComponent; 

