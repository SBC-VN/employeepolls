import { createSlice } from '@reduxjs/toolkit';


const authUserSlice = createSlice({
    name: 'authUser',
    initialState: {
      value: null,
    },
    reducers: {
        logon: (state, action) => {
            state.value = action.payload;
        },
        logoff: (state, action) => {
            state.value = null;
        }
    }
  });

export const { logon, logoff } = authUserSlice.actions;
export default authUserSlice.reducer;