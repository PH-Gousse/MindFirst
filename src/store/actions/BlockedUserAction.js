import {createAsyncThunk} from "@reduxjs/toolkit";
import {API, graphqlOperation} from "aws-amplify";
import {createBlockedUser} from "../../graphql/mutations";
import {blockedUserByBlockee, blockedUserByBlocker} from "../../graphql/queries";

export const createBlockedUserAPI = createAsyncThunk(
  'currentUser/create/blockedUser',
  async (blockedUser, {dispatch, getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().blockedUser
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    try {
      const result = await API.graphql(graphqlOperation(createBlockedUser, {input: blockedUser}));
      console.log('createBlockedUserAPI result', result);
      const blockedUserObj = result.data.createBlockedUser;

      return blockedUserObj.blockeeId;
    } catch (err) {
      console.log('Error creating blocked user:', err);
      return rejectWithValue([], err);
    }
  }
);

export const getBlockedUserByBlockerAPI = createAsyncThunk(
  'currentUser/getBy/blocker',
  async (userId, {dispatch, getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().blockedUser
    if (loading !== 'pending' || requestId !== currentRequestId) {
      console.log('getBlockedUserByBlockerAPI requestId', requestId, 'currentRequestId', currentRequestId, 'loading', loading);
      return;
    }

    try {
      const blockers = await API.graphql(graphqlOperation(blockedUserByBlocker, {blockerId: userId}));
      const blockersArray = blockers.data.blockedUserByBlocker.items;
      // console.log('getBlockedUserByBlockerAPI blockersArray', blockersArray);

      const blockersIds = blockersArray.map(blocker => blocker.blockeeId);

      const blockees = await API.graphql(graphqlOperation(blockedUserByBlockee, {blockeeId: userId}));
      const blockeesArray = blockees.data.blockedUserByBlockee.items;
      // console.log('getBlockedUserByBlockerAPI blockeesArray', blockeesArray);

      const blockeesIds = blockeesArray.map(blockee => blockee.blockerId);

      const mergedIds = [...new Set([...blockersIds, ...blockeesIds])];

      return mergedIds;
    } catch (err) {
      console.log('Error get blocked user by blocker:', err);
      return rejectWithValue([], err);
    }
  }
);
