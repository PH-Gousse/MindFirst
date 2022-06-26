import {createSlice} from '@reduxjs/toolkit';
import {
  CreateChatRoomAPI,
  createMessageAPI,
  getChatRoomsByUserIdAPI,
  getMessageFromChatRoomAPI
} from "../actions/ChatAction";

const ChatSlice = createSlice({
  name: 'ChatSlice',
  initialState: {
    chatRoomUsers: [],
    currentChatRoomMessages: [],

    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    setChatRoomUsers: (state, action) => {
      state.chatRoomUsers = action.payload;
    },
    setCurrentChatRoomMessages: (state, action) => {
      state.currentChatRoomMessages = action.payload;
    }
  },
  extraReducers: {
    [CreateChatRoomAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [CreateChatRoomAPI.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.error = null;
    },
    [CreateChatRoomAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [getMessageFromChatRoomAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getMessageFromChatRoomAPI.fulfilled]: (state, action) => {
      state.currentChatRoomMessages = action.payload;
      state.loading = 'idle';
      state.error = null;
    },
    [getMessageFromChatRoomAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [createMessageAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [createMessageAPI.fulfilled]: (state, action) => {
      // console.log('createMessageAPI.fulfilled - action.payload', action.payload);
      const chatRoomId = action.payload.id;
      state.chatRoomUsers[chatRoomId].lastMessageContent = action.payload.lastMessageContent;
      state.chatRoomUsers[chatRoomId].lastMessageUserId = action.payload.lastMessageUserId;

      state.loading = 'idle';
      state.error = null;
    },
    [createMessageAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [getChatRoomsByUserIdAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [getChatRoomsByUserIdAPI.fulfilled]: (state, action) => {
      state.chatRoomUsers = action.payload;
      state.loading = 'idle';
      state.error = null;
    },
    [getChatRoomsByUserIdAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  }
});

export const {setChatRoomUsers, setCurrentChatRoomMessages} = ChatSlice.actions;

export default ChatSlice.reducer;
