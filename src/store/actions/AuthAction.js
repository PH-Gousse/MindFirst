import {createAsyncThunk} from "@reduxjs/toolkit";
import {Auth} from "aws-amplify";
import {createUserAPI, getUserAPI} from "./UserAction";


export const signUpAuth = createAsyncThunk(
  'authSlice/signUp',
  async (phoneNumber, {dispatch, getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().auth;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    try {
      const data = await Auth.signUp({
        username: phoneNumber,
        password: Date.now().toString(),
      });
      // console.log('Auth.signUp', data);

      /**
       * The user has been created.
       * Sign the user in.
       */
      const cognitoUser = await Auth.signIn(phoneNumber);
      // console.log('Auth.signIn', cognitoUser);

      return cognitoUser;

    } catch (error) {
      /**
       * The user already exists in Cognito.
       * Sign the user in
       */
      if (error.code === 'UsernameExistsException') {
        // console.log('UsernameExistsException Sign the User In');
        const cognitoUser = await Auth.signIn(phoneNumber);
        // console.log('Auth.signIn', cognitoUser);
        return cognitoUser;
      }
      return rejectWithValue('Error signUpAuth:', error);
    }
  }
);

export const confirmSignUpAuth = createAsyncThunk(
  'authSlice/confirmSignUp',
  async (signUpArg, {dispatch, getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().auth;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    try {
      // console.log('confirmSignUpAuth', signUpArg.cognitoUser)
      const data = await Auth.sendCustomChallengeAnswer(signUpArg.cognitoUser, signUpArg.code);
      // console.log('sendCustomChallengeAnswer', data.username);
      /**
       * Check that the phoneNumber exists in the database.
       * If yes, load the state
       * Otherwise, create a user
       */
      const returnGetUserApi = await dispatch(getUserAPI(data.username));
      // console.log('returnGetUserApi', returnGetUserApi);
      if (!returnGetUserApi || !returnGetUserApi.payload) {
        // console.log('Create the User profile');
        const user = {phoneNumber: data.username};
        await dispatch(createUserAPI(user));
      }
    } catch (error) {
      console.log('Error confirming sign up', error);
      return rejectWithValue([], error);
    }
  }
);

export const getCurrentUserAuth = createAsyncThunk(
  'authSlice/getCurrentAuthUser',
  async (_, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().auth;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    // to uncomment to logout the user from the slash screen
    // await Auth.signOut();
    try {
      const CognitoUser = await Auth.currentAuthenticatedUser();
      // console.log('getCurrentAuthUser', CognitoUser);

      return CognitoUser;
    } catch (err) {
      console.log('Error getCurrentAuthUser:', err);
      return null;
    }
  }
)

export const signOutAuth = createAsyncThunk(
  'authSlice/signOut',
  async (_, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().auth;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    /**
     * Remove any user-specific data
     * Should be moved to when a user logging with a different number than the one in local storage.
     * It will do for now
     */
    try {
      const data = await Auth.signOut();
      // console.log('signOutAuth - ', data);
    } catch (err) {
      console.log('error signing out: ', err);
      return rejectWithValue(err);
    }
  }
)
