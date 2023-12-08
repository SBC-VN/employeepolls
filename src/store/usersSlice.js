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
            // Only load if not already loaded
            if (state.loaded !== true) {
                state.values = action.payload;
                state.loaded = true;
            }
        },
        addUserResponse: (state, action) => {
            const { userId, pollId, option } = action.payload;
            const user = state.values[userId];
            user.answers[pollId] = option;
        },
        addUserPoll: (state, action) => {
            const { userId, pollId } = action.payload;
            const user = state.values[userId];
            user.questions.push(pollId);
        },
        // For testing purposes, remove before production.
        clearUsersData : (state, action) => {
            state.values = {};
            state.loaded = false;
        }
    }
  });

export const { addUser, loadUsers, addUserResponse, addUserPoll, clearUsersData } = usersSlice.actions;
export default usersSlice.reducer;