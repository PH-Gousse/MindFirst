import {createAsyncThunk} from "@reduxjs/toolkit";
import {API, graphqlOperation} from "aws-amplify";
import {createChatRoom, createChatRoomUser, updateChatRoom, createMessage} from "../../graphql/mutations";
import {getUser, messagesByChatRoom} from "../../graphql/Custom/users";

export const CreateChatRoomAPI = createAsyncThunk(
  'chatSlice/chatRoom/create',
  async (userId, {dispatch, getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading, chatRoomUsers} = getState().chat;
    const {id} = getState().currentUser;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    try {
      /**
       * Check that a chatroom with the userId and id doesn't already exist
       * Check the local state to see if the chatroom already exists
       * if yes , return the chatroom id
       * Otherwise, check the database to see if the chatroom already exists
       * if yes, return the chatroom id
       * Otherwise, create the chatroom and return the chatroom id
       */

      // console.log('CreateChatRoomAPI userId:', userId);
      const chatRoomUsersArray = Object.values(chatRoomUsers);
      const isChatRoomExists = chatRoomUsersArray.find(chatRoomUser => {
        return chatRoomUser.chatRoomUsers.items.some(user => user.user.id === userId);
      });

      if (isChatRoomExists) {
        // console.log('isChatRoomExists true');
        // console.log('isChatRoomExists', isChatRoomExists);
        return isChatRoomExists.id;
      }
      /**
       * Add a chat room
       */
      const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, {input: {}}));
      // console.log('newChatRoomData', newChatRoomData);
      if (!newChatRoomData.data) {
        console.log('Failed to create chat room');
        return;
      }
      const newChatRoom = newChatRoomData.data.createChatRoom;

      /**
       * Add the user passed down from the input to the chat room
       */
      await API.graphql((graphqlOperation(createChatRoomUser, {
        input: {
          userId: userId,
          chatRoomId: newChatRoom.id
        }
      })));

      /**
       * Add authenticated user to the chat room
       */
      await API.graphql((graphqlOperation(createChatRoomUser, {
        input: {
          userId: id,
          chatRoomId: newChatRoom.id
        }
      })));

      // append the new chatroom to the state

      return newChatRoom.id;
    } catch (err) {
      console.log('Error CreateChatRoomAPI', err);
      return rejectWithValue(err);
    }

  }
);


export const getMessageFromChatRoomAPI = createAsyncThunk(
  'chatSlice/chatRoom/message/get',
  async (chatRoomId, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().chat;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      console.log('getMessageFromChatRoomAPI - KO');
      return;
    }

    try {
      const messages = await API.graphql(graphqlOperation(messagesByChatRoom, {
        chatRoomId: chatRoomId,
        sortDirection: 'DESC'
      }));
      // console.log('messages', messages.data.messagesByChatRoom.items);
      if (!messages.data.messagesByChatRoom) {
        console.log('Failed to fetch chat rooms');
        return;
      }

      const outputMessages = [];

      messages.data.messagesByChatRoom.items.forEach(message => {
        const msg = {
          _id: message.id,
          text: message.content,
          createdAt: message.createdAt,
          user: {
            _id: message.user.id,
            name: message.user.profile.firstName,
            avatar: null,
          },
        };
        outputMessages.push(msg);
      });

      // console.log('outputMessages', outputMessages);
      return outputMessages;

    } catch (err) {
      console.log('Error getMessageFromChatRoomAPI', err);
      return rejectWithValue(err);
    }
  }
);


export const createMessageAPI = createAsyncThunk(
  'chatSlice/chatRoom/message/create',
  async (messageInput, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().chat;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      console.log('createMessageAPI KO');
      return;
    }

    // console.log('createMessageAPI messageInput', messageInput);

    try {
      const {data: {createMessage: { chatRoom, chatRoom: {_version}}}} = await API.graphql(graphqlOperation(createMessage, {input: messageInput}));
      // console.log('createMessageAPI - chatRoom', chatRoom);
      // console.log('createMessageAPI - _version', _version);

      /**
       * Update the chatRoom last message
       */
      const chatRoomData = await API.graphql(graphqlOperation(updateChatRoom, {
        input: {
          id: messageInput.chatRoomId,
          lastMessageContent: messageInput.content,
          lastMessageUserId: messageInput.userId,
          _version: _version
        }
      }));

      return {id: messageInput.chatRoomId, lastMessageContent: messageInput.content, lastMessageUserId: messageInput.userId};
    } catch (err) {
      console.log('Error createMessageAPI', err);
      return rejectWithValue(err);
    }

  }
);

export const getChatRoomsByUserIdAPI = createAsyncThunk(
  'chatSlice/chatRooms/get',
  async (userId, {getState, requestId, rejectWithValue}) => {
    const {blockedUser: {blockedUsers}} = getState().blockedUser;
    try {
      const response = await API.graphql(graphqlOperation(getUser, {id: userId}));
      const chatRooms = response.data.getUser.chatRoomUser.items;

      let chatRoomsData = {};

      // console.log('blockedUsers', blockedUsers);
      chatRooms.forEach(chatRoom => {
        const chatRoomUsers = chatRoom.chatRoom.chatRoomUsers.items;
        const chatRoomUsersIds = chatRoomUsers.map(chatRoomUser => chatRoomUser.user.id);
        // console.log('chatRoomUsersIds', chatRoomUsersIds);
        // console.log('chatRoom', chatRoom);
        const intersection = chatRoomUsersIds.filter(id => blockedUsers.includes(id));
        // console.log('intersection', intersection);
        if (intersection.length === 0) {
          chatRoomsData[chatRoom.chatRoom.id] = chatRoom.chatRoom;
        }
      });

      // console.log('getChatRoomsByUserIdAPI - chatRoomsData', chatRoomsData);

      return chatRoomsData;
    } catch (err) {
      console.log('Error getChatRoomsByUserIdAPI', err);
      return rejectWithValue(err);
    }
  }
);

