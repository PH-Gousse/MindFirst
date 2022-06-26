import {createSlice} from '@reduxjs/toolkit';
import {
  createUserAPI,
  getRankByUserAPI, getRankProfileByUserIdAPI,
  getUserAPI,
  updateUserAPI
} from "../actions/UserAction";
import {addAnswerAPI} from "../actions/AnswerAction";
import {signOutAuth} from "../actions/AuthAction";

const CurrentUserSlice = createSlice({
  name: 'currentUserSlice',
  initialState: {
    id: '',
    idProfile: '',
    phoneNumber: '',
    email: '',
    isOnBoardingCompleted: false,
    answers: {
      answeredQuestions: [],
      answeredQuestionsId: [],
      unansweredQuestions: [],
    },
    questions: [],
    matches: {
      ranks: []
    },
    chats: {
      users: []
    },
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    setPhoneNumber: (state, action) => {
      if (!state.id) {
        state.phoneNumber = action.payload;
      }
    },
    setIsProfileCompleted: (state, action) => {
      state.isOnBoardingCompleted = action.payload;
    }
  },
  extraReducers: {
    [createUserAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [createUserAPI.fulfilled]: (state, action) => {
      // console.log('createUserAPI.fulfilled - action.payload', action.payload);
      state.id = action.payload.id;
      state.idProfile = action.payload.idProfile;
      state.phoneNumber = action.payload.phoneNumber;
      state.answers.unansweredQuestions = action.payload.unansweredQuestions;
      state.loading = 'idle';
      state.error = null;
    },
    [createUserAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [updateUserAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [updateUserAPI.fulfilled]: (state, action) => {
      state.isOnBoardingCompleted = action.payload.isOnBoardingCompleted
      state.loading = 'idle';
      state.error = null;
    },
    [updateUserAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [getUserAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getUserAPI.fulfilled]: (state, action) => {
      // console.log('getUserAPI.fulfilled', action.payload);
      if (action.payload) {
        state.id = action.payload.id;
        state.idProfile = action.payload.profile.id;
        state.phoneNumber = action.payload.phoneNumber;
        state.isOnBoardingCompleted = action.payload.isOnBoardingCompleted;
        state.answers.answeredQuestions = action.payload.answers;
        state.answers.answeredQuestionsId = action.payload.answeredQuestionsId;
        state.answers.unansweredQuestions = action.payload.unansweredQuestions;
        state.questions = action.payload.questions;
      }
      state.loading = 'idle';
      state.error = null;
    },
    [getUserAPI.rejected]: (state, action) => {
      // console.log('getUserAPI.rejected');
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [addAnswerAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [addAnswerAPI.fulfilled]: (state, action) => {
      // console.log('addAnswerAPI - action.payload', action.payload);
      if (action.payload) {
        // Filter out the answer that got answered and add the one that has been updated
        const newAnsweredQuestions = state.answers.answeredQuestions.filter(answer => answer.id !== action.payload.id);
        newAnsweredQuestions.push(action.payload);

        state.answers.answeredQuestions = newAnsweredQuestions;

        const newAnsweredQuestionsId = state.answers.answeredQuestionsId.filter(answerId => answerId !== action.payload.id);
        newAnsweredQuestionsId.push(action.payload.id);

        state.answers.answeredQuestionsId = newAnsweredQuestionsId;

        state.answers.unansweredQuestions = state.answers.unansweredQuestions.filter(question => {
          return question.id !== action.payload.question.id;
        });
      }

      state.loading = 'idle';
      state.error = null;
    },
    [addAnswerAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [getRankByUserAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getRankByUserAPI.fulfilled]: (state, action) => {
      state.matches.ranks = action.payload;
      state.loading = 'idle';
      state.error = null;
    },
    [getRankByUserAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [signOutAuth.fulfilled]: (state, action) => {
      console.log('IN CurrentUserSlice signOutAuth.fulfilled called');
      state.isOnBoardingCompleted = false;
    },
    [getRankProfileByUserIdAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getRankProfileByUserIdAPI.fulfilled]: (state, action) => {
      console.log('getRankProfileByUserIdAPI.fulfilled - action.payload', action.payload);
      if (action.payload) {
        state.chats.users.push(action.payload);
      }
      state.loading = 'idle';
      state.error = null;
    },
    [getRankProfileByUserIdAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  }
});

// Action creators are generated for each case reducer function
export const {setPhoneNumber, setIsProfileCompleted} = CurrentUserSlice.actions;

export default CurrentUserSlice.reducer;
