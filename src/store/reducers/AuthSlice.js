import {createSlice} from '@reduxjs/toolkit';
import {confirmSignUpAuth, getCurrentUserAuth, signOutAuth, signUpAuth} from "../actions/AuthAction";

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState: {
    isAuthed: true,

    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    setIsAuthed: (state, action) => {
      state.isAuthed = action.payload;
    }
  },
  extraReducers: {
    [signUpAuth.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [signUpAuth.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.error = null;
    },
    [signUpAuth.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [confirmSignUpAuth.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [confirmSignUpAuth.fulfilled]: (state, action) => {
      // console.log('confirmSignUpAuth.fulfilled');
      state.isAuthed = true;
      state.loading = 'idle';
      state.error = null;
    },
    [confirmSignUpAuth.rejected]: (state, action) => {
      // console.log('confirmSignUpAuth.rejected');
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [getCurrentUserAuth.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [getCurrentUserAuth.fulfilled]: (state, action) => {
      if (!action.payload) {
        state.isAuthed = false;
      }
      state.loading = 'idle';
      state.error = null;
    },
    [getCurrentUserAuth.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [signOutAuth.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [signOutAuth.fulfilled]: (state, action) => {
      state.isAuthed = false;
      state.loading = 'idle';
      state.error = null;
    },
    [signOutAuth.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  }
});

export const {setIsAuthed} = AuthSlice.actions;

export default AuthSlice.reducer;
