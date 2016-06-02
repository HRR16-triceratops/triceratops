import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const loggerMiddleware = createLogger();;

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, loggerMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}; 

