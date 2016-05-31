import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import CoreLayout from './components/CoreLayout';
import NavBar from './containers/NavBar';
// Containers are essentially representative of pages i.e. Page components 
import Listings from './containers/Listings'; 
import ManageListings from './containers/ManageListings'; 
import Login from './containers/Login'; 
import TestComponent from './components/TestComponent';
import SingleListingItemDetailed from './components/SingleListingItemDetailed'; 
import Profile from './containers/Profile'; 

export default (
  <Route path="/" component={CoreLayout}>
	  <IndexRedirect to="/listings" />
    <Route path="listings" component={Listings} />
    <Route path="listings/:itemId" component={SingleListingItemDetailed} />
    <Route path="manage" component={ManageListings} />
    <Route path="login" component={Login} />
    <Route path="profile" component={Profile} />
    <Route path="testRoute" component={TestComponent} />
  </Route>
)