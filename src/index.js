import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import AppRouter from './routes/routes';
import { store } from './helpers'

import './index.css';
import * as serviceWorker from './serviceWorker';

render(
    <Provider store={store}>
      <Router>
          <AppRouter />
      </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
