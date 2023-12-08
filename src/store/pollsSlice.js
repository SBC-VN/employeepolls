import { createSlice } from '@reduxjs/toolkit';

const pollsSlice = createSlice({
    name: 'polls',
    initialState: { values: {}, loaded: false},
    reducers: {
        addPoll: (state, action) => {
            if (!state.hasOwnProperty(action.payload.id)) {
                state.values[action.payload.id] = action.payload;
                state.values[action.payload.id].closed = false;
            }
            else {
                console.warn(`Poll ${action.payload.id} already exists.`);
            }
        },
        loadPolls: (state, action) => {
            // Only load if not already loaded
            if (state.loaded !== true) {   
                state.values = action.payload;
                state.loaded = true;
            }
        },
        addPollVote: (state, action) => {
            const { authedUser, pollId, option } = action.payload;

            if (state.values.hasOwnProperty(pollId)) {
                const poll = state.values[pollId];
                poll[option].votes.push(authedUser);
            }
            else {
                console.warn(`Poll ${pollId} does not exist.`);
            }
        },
        closePoll: (state, action) => {
            const { pollId } = action.payload;
            if (state.values.hasOwnProperty(pollId)) {
                const poll = state.values[pollId];
                poll.closed = true;
            }
            else {
                console.warn(`Poll ${pollId} does not exist.`);
            }            
        },
        // For testing purposes, remove before production.
        clearPollsData : (state, action) => {
            state.values = {};
            state.loaded = false;
        }
    }
  });

export const { addPoll, loadPolls, addPollVote, closePoll, clearPollsData } = pollsSlice.actions;
export default pollsSlice.reducer;