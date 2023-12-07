import { createSlice } from '@reduxjs/toolkit';

const pollsSlice = createSlice({
    name: 'polls',
    initialState: {
        value: {},
        loaded: false
    },
    reducers: {
        addPoll: (state, action) => {
            if (!state.hasOwnProperty(action.payload.id)) {
                state.value[action.payload.id] = action.payload;
                state.value[action.payload.id].closed = false;
            }
            else {
                console.warn(`Poll ${action.payload.id} already exists.`);
            }
        },
        loadPolls: (state, action) => {
            state.value = action.payload;
            state.loaded = true;
        },
        addPollVote: (state, action) => {
            const { authedUser, pollId, option } = action.payload;
            const poll = state.value.find(poll => poll.id === pollId);
            poll[option].votes.push(authedUser);
        },
        closePoll: (state, action) => {
            const { pollId } = action.payload;
            const poll = state.value.find(poll => poll.id === pollId);
            poll.closed = true;
        }
    }
  });

export const { addPoll, loadPolls, addPollVote, closePoll } = pollsSlice.actions;
export default pollsSlice.reducer;