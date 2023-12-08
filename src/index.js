import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';
import { configureStore } from '@reduxjs/toolkit'
import pollsSlice from './store/pollsSlice';
import usersSlice from './store/usersSlice';
import authUserSlice from './store/authUserSlice';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import {combineReducers} from "redux"; 
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import 'bootstrap/dist/css/bootstrap.min.css'
import { PersistGate } from 'redux-persist/integration/react';

const rootReducer = combineReducers({
  polls : pollsSlice,
  users : usersSlice,
  authUser : authUserSlice
});

const persistConfig = {
  key: 'userAuth',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
});

let persistor = persistStore(store)

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);