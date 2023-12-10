import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import { configureStore } from '@reduxjs/toolkit'
import pollsSlice from '../store/pollsSlice';
import usersSlice from '../store/usersSlice';
import authUserSlice from '../store/authUserSlice';
import { Provider } from "react-redux";
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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

test('renders main App', () => {
  <Provider store={store}>
    <MemoryRouter>
      render(<App />);
    </MemoryRouter>
  </Provider>;  
  screen.debug();
});
