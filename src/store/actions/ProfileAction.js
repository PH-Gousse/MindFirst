import {createAsyncThunk} from "@reduxjs/toolkit";
import {API, graphqlOperation} from "aws-amplify";
import {createProfile, updatePhoto} from "../../graphql/mutations";
import {updateProfile} from "../../graphql/Custom/profile";

export const createProfileAPI = createAsyncThunk(
  'profile/create',
  async (profileInput, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().profile;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    try {
      const newProfile = await API.graphql(graphqlOperation(createProfile, {input: profileInput}));
      console.log('createProfileAPI - createProfile', newProfile.data.createProfile);
      return newProfile.data.createProfile;
    } catch (err) {
      console.log('Error creating profile:', err);
      return rejectWithValue([], err);
    }
  }
);

export const updateProfileAPI = createAsyncThunk(
  'profile/update/',
  async (profileInput, {getState, requestId, rejectWithValue}) => {
    const {profile, currentRequestId, loading} = getState().profile;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    profileInput.id = profile.id;

    console.log('updateProfileAPI - profile.id', profile.id);
    try {

      const updatedProfile = await API.graphql(graphqlOperation(updateProfile, {input: profileInput}));
      console.log('updateProfileAPI - updateProfile', updatedProfile.data.updateProfile);

      updatedProfile.data.updateProfile.photos = updatedProfile.data.updateProfile.photos.items.map((photo) => {
        return {
          id: photo.id,
          key: photo.key,
          position: photo.position,
        }
      });

      return updatedProfile.data.updateProfile;
    } catch (err) {
      console.log('error updating profile:', err);
      return rejectWithValue([], err);
    }
  }
);

export const reOrderPhotosAPI = createAsyncThunk(
  'profile/reOrder/photos',
  async (photos, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().profile;

    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    try {
      for (const photo of photos) {
        console.log('reOrderPhotosAPI - photo', photo);
        const p = {
          id: photo.id,
          position: photo.position,
        };
        const updatedPhoto = await API.graphql(graphqlOperation(updatePhoto, {input: p}));
        console.log('reOrderPhotosAPI - updatePhoto', updatedPhoto.data.updatePhoto);
      }
    } catch (err) {
      console.log('Error re-ordering photos:', err);
      return rejectWithValue([], err);
    }
  }
)
