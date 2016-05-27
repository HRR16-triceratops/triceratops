import 'bootstrap-material-design/dist/css/bootstrap-material-design.css';
import React from 'react';
import ReactDOM from 'react-dom';

// Router
import { Router, Route, IndexRoute, Link, History } from "react-router";
import { browserHistory } from "react-router";

// Components
import NavComponent from './nav.jsx';
import SearchComponent from './search.jsx';
import UserComponent from './user.jsx';
import CreateShareComponent from './createShare.jsx';
import DetailComponent from './detail.jsx';
import LoginComponent from './login.jsx';
import TestComponent from './test.jsx'; 

ReactDOM.render(
  <Router history={browserHistory}>
	  <Route component={NavComponent}>
		    <Route path="/" component={SearchComponent} />
		    <Route path="/share" component={DetailComponent} />
		    <Route path="/create" component={CreateShareComponent} />
		    <Route path="/user" component={UserComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/test" component={TestComponent} />
	   </Route>
  </Router>, 
  document.getElementById('root')
);