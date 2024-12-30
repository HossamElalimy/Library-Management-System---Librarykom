import React from 'react';
import  ReactDOM  from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/ReduxStore';
//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
