import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
// import api from '../middleware/api'
import { routerMiddleware, push } from 'react-router-redux';
import rootReducer from '../reducers/rootReducer';

const router = routerMiddleware(browserHistory);
const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunk,
      router,
      loggerMiddleware
    )
  );
}
