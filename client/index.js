import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/RootContainer.js';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';

require ("./styles/styles-main.css");

injectTapEventPlugin();

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
