import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import api from '../middleware/api'
import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    // applyMiddleware(thunk)
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}; 