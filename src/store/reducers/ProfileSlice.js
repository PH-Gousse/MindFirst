import {createSlice} from '@reduxjs/toolkit';
import {createProfileAPI, reOrderPhotosAPI, updateProfileAPI} from "../actions/ProfileAction";
import {removePictureAPI, uploadPictureAPI} from "../actions/StorageAction";

const ProfileSlice = createSlice({
  name: 'ProfileSlice',
  initialState: {
    profile: {
      id: '',
      firstName: '',
      lastName: '',
      birthday: '',
      gender: '',
      interestedIn: '',
      shortDescription: '',
      photos: [],
      ageRange: [18, 99],
      location: '',
    },

    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      if (!action.payload.ageRange) {
        state.profile.ageRange = [18, 99];
      }
    },
    setProfilePhotos: (state, action) => {
      state.profile.photos = action.payload;
    }
  },
  extraReducers: {
    [createProfileAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [createProfileAPI.fulfilled]: (state, action) => {
      state.profile.id = action.payload.id;
      state.loading = 'idle';
      state.error = null;
    },
    [createProfileAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [updateProfileAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [updateProfileAPI.fulfilled]: (state, action) => {
      state.profile = {...state.profile, ...action.payload};
      state.loading = 'idle';
      state.error = null;
    },
    [updateProfileAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [uploadPictureAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [uploadPictureAPI.fulfilled]: (state, action) => {
      // console.log('state.profile', state.profile);
      // console.log('uploadPictureAPI.fulfilled action.payload', action.payload);
      state.profile.photos.push(action.payload);
      state.loading = 'idle';
      state.error = null;
    },
    [uploadPictureAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [reOrderPhotosAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [reOrderPhotosAPI.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.error = null;
    },
    [reOrderPhotosAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [removePictureAPI.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [removePictureAPI.fulfilled]: (state, action) => {
      // console.log('state.profile', state.profile);
      // console.log('removePictureAPI.fulfilled action.payload', action.payload);
      state.profile.photos = state.profile.photos.filter((photo) => photo.id !== action.payload.id)
      state.loading = 'idle';
      state.error = null;
    },
    [removePictureAPI.rejected]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  }
});

export const {setProfile, setProfilePhotos} = ProfileSlice.actions;

export default ProfileSlice.reducer;
