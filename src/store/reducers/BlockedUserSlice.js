import {createSlice} from "@reduxjs/toolkit";
import {createBlockedUserAPI, getBlockedUserByBlockerAPI} from "../actions/BlockedUserAction";

const BlockedUserSlice = createSlice({
  name: 'blockedUserSlice',
  initialState: {
    blockedUser: {
      blockedUsers: []
    },
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  extraReducers: {
    [createBlockedUserAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [createBlockedUserAPI.fulfilled]: (state, action) => {
      console.log('createBlockedUserAPI.fulfilled - action.payload', action.payload);
      if (action.payload) {
        state.blockedUser.blockedUsers.push(action.payload);
      }
      state.loading = 'idle';
      state.error = null;
    },
    [createBlockedUserAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [getBlockedUserByBlockerAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getBlockedUserByBlockerAPI.fulfilled]: (state, action) => {
      // console.log('getBlockedUserByBlockerAPI.fulfilled - action.payload', action.payload);
      state.blockedUser.blockedUsers = action.payload;
      state.loading = 'idle';
      state.error = null;
    },
    [getBlockedUserByBlockerAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  }
});

export default BlockedUserSlice.reducer;
