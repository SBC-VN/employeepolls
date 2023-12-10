import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NewPoll from './NewPoll';

import { configureStore } from '@reduxjs/toolkit'
import pollsSlice from '../store/pollsSlice';
import usersSlice from '../store/usersSlice';
import authUserSlice from '../store/authUserSlice';
import { Provider, useDispatch } from "react-redux";
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { _getUsers, _getQuestions } from '../backend/_data';
import { loadUsers } from '../store/usersSlice';
import { loadPolls } from '../store/pollsSlice';
import { logon } from '../store/authUserSlice';

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



describe('NewPoll tests', () => {
      test('renders new poll form', () => {
          <Provider store={store}>
              <MemoryRouter>
                render(<NewPoll />);
              </MemoryRouter>
          </Provider>;
          screen.debug();
      });

      test('poll form has two options', async () => {
        await _getUsers().then(users => {
          store.dispatch(loadUsers(users)) });
        await _getQuestions().then(polls => {
          store.dispatch(loadPolls(polls));
          store.dispatch(logon("sarahedo"));
         });
        
          let component = render(
              <Provider store={store}>
                  <MemoryRouter>
                      <NewPoll />
                  </MemoryRouter>
              </Provider>);
          expect(component.getAllByRole('textbox').length).toBe(2);
      });
});