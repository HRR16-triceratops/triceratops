import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import CoreLayout from './components/CoreLayout';
import NavBar from './containers/NavBar';
// Containers are essentially representative of pages i.e. Page components
import Listings from './containers/ListingsContainer';
import ManageListings from './containers/ManageListingsContainer';
import Login from './containers/Login';
import Signup from './containers/SignupContainer.js';
import TestComponent from './components/TestComponent';
import ItemDetail from './containers/ItemDetailContainer';
import Profile from './containers/ProfileContainer';

export default (
  <Route path="/" component={CoreLayout}>
	  <IndexRedirect to="/listings" />
    <Route path="listings" component={Listings} />
    <Route path="listings/:itemId" component={ItemDetail} />
    <Route path="manage" component={ManageListings} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    <Route path="profile" component={Profile} />
    <Route path="testRoute" component={TestComponent} />
  </Route>
)
