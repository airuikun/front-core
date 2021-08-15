import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


import configureStore from './store/configureStore'
import App from './containers/App'


const store = configureStore();


render(
  <Provider store={store}>
      <App  />
  </Provider>,
  document.getElementById('page-container')
)