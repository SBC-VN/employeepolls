import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';
import { configureStore } from '@reduxjs/toolkit'
import pollsSlice from './store/pollsSlice';
import usersSlice from './store/usersSlice';
import authUserSlice from './store/authUserSlice';
import { Provider } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore({
  reducer: {
    polls : pollsSlice,
    users : usersSlice,
    authUser : authUserSlice
  }
});

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);