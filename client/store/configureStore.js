import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'
import thunk from 'redux-thunk';
// import api from '../middleware/api'
import rootReducer from '../reducers/rootReducer';

const loggerMiddleware = createLogger();;

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunk,
      loggerMiddleware
    )
  );
}
