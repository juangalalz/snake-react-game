import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import reducers from '../redux/reducers';

// const loggerMiddleware = createLogger();

export const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  ),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
