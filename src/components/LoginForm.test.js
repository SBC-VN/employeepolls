import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import LoginForm from './LoginForm';

import { configureStore } from '@reduxjs/toolkit'
import pollsSlice from '../store/pollsSlice';
import usersSlice from '../store/usersSlice';
import authUserSlice from '../store/authUserSlice';
import { Provider } from "react-redux";
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

describe('LoginForm tests', () => {
    test('Snapshot test', () => {
        let loginComponent = render(
          <Provider store={store}>
              <MemoryRouter>
                  <LoginForm />
              </MemoryRouter>
          </Provider>);
        expect(loginComponent).toMatchSnapshot(); 
    });

    test('renders login form', () => {
        <Provider store={store}>
            <MemoryRouter>
                render(<LoginForm />);
            </MemoryRouter>
        </Provider>;
        screen.debug();
    });

    test('Login click fires', async () => {
        await _getUsers().then(users => {
          store.dispatch(loadUsers(users)) });
        await _getQuestions().then(polls => {
          store.dispatch(loadPolls(polls));
        });

        let closeFlag = false;
        let handleClose = () => { closeFlag = true; };
      
        let component = render(
            <Provider store={store}>
                <MemoryRouter>
                  <LoginForm handleClose={handleClose} />
                </MemoryRouter>
            </Provider>);

        var submitButton = component.getByTestId('submit-button');
        fireEvent.click(submitButton);
        expect(closeFlag).toBe(true);
        expect(store.getState().authUser.value).toBe("sarahedo");
    });
});
