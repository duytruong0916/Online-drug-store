import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import cartReducer from './reducers/cart';
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      cart: cartReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};