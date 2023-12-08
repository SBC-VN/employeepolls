import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
      values: {},
      loaded: false
    },
    reducers: {
        addUser: (state, action) => {
            if (!state.hasOwnProperty(action.payload.id)) {
                state.values[action.payload.id] = action.payload;
            }
            else {
                console.warn(`User ${action.payload.id} already exists.`);
            }
        },
        loadUsers: (state, action) => {
            state.values = action.payload;
            state.loaded = true;
        },
        addUserResponse: (state, action) => {
            const { userId, pollId, option } = action.payload;
            const user = state.values[userId];
            user.answers[pollId] = option;
        }
    }
  });

export const { addUser, loadUsers, addUserResponse } = usersSlice.actions;
export default usersSlice.reducer;