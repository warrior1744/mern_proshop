import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './store'  //pass to the Provider
import './bootstrap.css';
import './index.css';
import App from './App';

// visit https://react-redux.js.org/api/hooks

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

