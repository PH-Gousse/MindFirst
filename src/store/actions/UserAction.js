import {createAsyncThunk} from "@reduxjs/toolkit";
import {API, Auth, Cache, graphqlOperation} from "aws-amplify";
import {getRankByUser, getUserRankData, userByPhoneNumber} from "../../graphql/Custom/users";
import {createProfileAPI} from "./ProfileAction";
import {setProfile, setProfilePhotos} from "../reducers/ProfileSlice";
import {getAllQuestions} from "../queryHelper/QuestionQueries";
import {getChatRoomsByUserIdAPI} from "./ChatAction";
import {getAllAnswers} from "../queryHelper/AnswerQueries";
import {computePercentageMatching, getAllSameQuestions} from "../../helpers/UserDataManagement/computeProfile";
import {createUser, updateUser} from "../../graphql/mutations";
import {getBlockedUserByBlockerAPI} from "./BlockedUserAction";


export const createUserAPI = createAsyncThunk(
  'currentUser/create',
  async (user, {dispatch, getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().currentUser
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    try {
      const profileData = {
        ageRange: [18, 99]
      }
      const profileSaved = await dispatch(createProfileAPI(profileData));
      const userModel = {
        phoneNumber: user.phoneNumber,
        userProfileId: profileSaved.payload.id
      };
      // console.log('createUserAPI - userModel', userModel);
      const userSaved = await API.graphql(graphqlOperation(createUser, {input: userModel}));
      // console.log('createUserAPI - userSaved', userSaved.data.createUser);

      const allQuestions = await getAllQuestions();
      // console.log('allQuestions - length:', allQuestions.length);

      return {...userSaved.data.createUser, ...{idProfile: profileSaved.id}, ...{unansweredQuestions: allQuestions}};
    } catch (err) {
      console.log('Error creating user:', err);
      return rejectWithValue([], err);
    }
  }
);

export const updateUserAPI = createAsyncThunk(
  'currentUser/update/user',
  async (userInput, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading, id} = getState().currentUser;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    userInput.id = id;
    try {
      const updatedUser = await API.graphql(graphqlOperation(updateUser, {input: userInput}));

      return updatedUser.data.updateUser;
    } catch (err) {
      console.log('Error updating user:', err);
      return rejectWithValue([], err);
    }
  }
);

const syncGetUser = async (phoneNumber) => {
  const {data: {userByPhoneNumber: {items}}} = await API.graphql(graphqlOperation(userByPhoneNumber, {phoneNumber: phoneNumber}));

  // console.log('syncGetUser - users', items);
  if (items.length > 1) throw new Error(`Duplicated user with phone number ${phoneNumber}`);
  if (items.length === 0) return null;

  let user = items[0];
  // console.log('syncGetUser user', user);

  const allQuestions = await getAllQuestions();
  // console.log('allQuestions - length:', allQuestions.length);
  const answers = await getAllAnswers(user.id);
  // console.log('answers:', answers);
  // console.log('answers - length:', answers.length);

  const answeredQuestionsId = answers.map((answer) => answer.question.id);
  // console.log('answeredQuestionsId', answeredQuestionsId);
  const unansweredQuestions = allQuestions.filter(question => {
    // console.log('question', question);
    return answeredQuestionsId.indexOf(question.id) === -1;
  });

  if (unansweredQuestions.length !== 0) {
    // console.log('CACHE REMOVED key = qs_itemIndex');
    await Cache.removeItem('qs_itemIndex');
  }
  // console.log('unansweredQuestions', unansweredQuestions);

  user.profile.photos = user.profile.photos.items.map((photo) => {
    return {
      id: photo.id,
      key: photo.key,
      position: photo.position,
    }
  });

  user.profile.photos.sort((a, b) => {
    return a.position > b.position;
  });
  // console.log('photos - length:', user.profile.photos.length);

  return {
    ...user, answers, ...{
      answeredQuestionsId,
      unansweredQuestions
    }, ...{questions: allQuestions}, ...{profile: user.profile, photos: user.profile.photos}
  };
};

export const getUserAPI = createAsyncThunk(
  'currentUser/get/user',
  async (phoneNumber, {dispatch, getState, requestId, rejectWithValue}) => {
    const currentRequestId = getState().currentUser.currentRequestId;
    const loading = getState().currentUser.loading;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    try {
      console.log('getUserAPI - phoneNumber', phoneNumber);
      const userData = await syncGetUser(phoneNumber);
      // console.log('getUserAPI - userData', userData);
      if (!userData) return null;

      dispatch(setProfile(userData.profile));
      dispatch(setProfilePhotos(userData.photos));
      await dispatch(getBlockedUserByBlockerAPI(userData.id));
      dispatch(getChatRoomsByUserIdAPI(userData.id));
      return userData;
    } catch (err) {
      console.log('Error get user:', err);
      return rejectWithValue([], err);
    }
  }
);

export const getRankByUserAPI = createAsyncThunk(
  'currentUser/get/rankByUser',
  async (_, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading, id} = getState().currentUser;
    const {blockedUser: {blockedUsers}} = getState().blockedUser;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    try {
      const rankUsers = await API.graphql(graphqlOperation(getRankByUser, {userId: id}));
      // console.log('getRankByUserAPI', rankUsers);

      let rankUsersArray = [];

      rankUsers.data.getRankByUser.forEach((rankUser) => {
        // console.log('rankUser.userId', rankUser.userId);
        const intersection = blockedUsers.includes(rankUser.userId);
        // console.log('blockedUsers', blockedUsers);
        // console.log('intersection', intersection);
        if (!intersection) {
          rankUsersArray.push(rankUser);
        }
      });

      // console.log('getRankByUserAPI - rankUsersArray', rankUsersArray);

      for (const user of rankUsersArray) {
        // console.log('forEach', user);
        user.profile.photos = user.profile.photos.items.map((photo) => {
          return {
            id: photo.id,
            key: photo.key,
            position: photo.position,
          }
        });

        user.profile.photos.sort((a, b) => {
          return a.position > b.position;
        });
      }

      // console.log('getRankByUserAPI - rankUsersArray', rankUsersArray);
      return rankUsersArray;
    } catch (err) {
      console.log('Error getRankByUserAPI', err);
      return rejectWithValue([], err);
    }
  }
);

export const getRankProfileByUserIdAPI = createAsyncThunk(
  'currentUser/get/userProfile',
  async (rankedUserId, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading, answers: {answeredQuestions}, chats: {users}} = getState().currentUser;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    try {

      // Check that the userProfile isn't already in the array
      let userRankData = users.find(userProfile => userProfile.userId === rankedUserId);
      if (userRankData) {
        console.log('getRankProfileByUserIdAPI - userProfile already in the store');
        return;
      }

      const {
        data: {
          getUser: {
            answers: {items},
            profile
          }
        }
      } = await API.graphql(graphqlOperation(getUserRankData, {id: rankedUserId}));
      const answerWithSameQuestions = getAllSameQuestions(answeredQuestions, items);
      const percentage = computePercentageMatching(answerWithSameQuestions);

      userRankData = {
        userId: rankedUserId,
        percentage: percentage,
        profile: {
          id: profile.id,
          firstName: profile.firstName,
          birthday: profile.birthday,
          shortDescription: profile.shortDescription,
          location: profile.location,
          photos: profile.photos.items.map(photo => photo)
        },
        answerWithSameQuestions: answerWithSameQuestions.slice(0, 5)
      }

      return userRankData;
    } catch (err) {
      console.log('Error getRankProfileByUserIdAPI', err);
      return rejectWithValue([], err);
    }
  }
);
