import { createSlice } from '@reduxjs/toolkit';


const usersSlice = createSlice({
    name: 'users',
    initialState: {
      value: {},
      loaded: false
    },
    reducers: {
        addUser: (state, action) => {
            if (!state.hasOwnProperty(action.payload.id)) {
                state.value[action.payload.id] = action.payload;
            }
            else {
                console.warn(`User ${action.payload.id} already exists.`);
            }
        },
        loadUsers: (state, action) => {
            state.value = action.payload;
            state.loaded = true;
        },
        addUserResponse: (state, action) => {
            const { authedUser, pollId, answer } = action.payload;
            const user = state.value[authedUser];
            user.answers[pollId] = answer;
        }
    }
  });

export const { addUser, loadUsers, addUserResponse } = usersSlice.actions;
export default usersSlice.reducer;