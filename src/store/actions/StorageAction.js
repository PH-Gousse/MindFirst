import {createAsyncThunk} from "@reduxjs/toolkit";
import {Storage} from "aws-amplify";
import {API, graphqlOperation} from "aws-amplify";
import * as mime from "react-native-mime-types";
import {createPhoto, deletePhoto} from "../../graphql/mutations";

export const uploadPictureAPI = createAsyncThunk(
  'profile/upload/picture',
  async (image, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading, profile} = getState().profile;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    // console.log('uploadPictureAPI', profile.id);
    try {
      const imageName = image.uri.replace(/^.*[\\\/]/, '');
      // console.log('uploadPictureAPI - imageName', imageName);
      const access = {level: "public", contentType: mime.lookup(image.uri)};

      const responseFetch = await fetch(image.uri);
      const blob = await responseFetch.blob();
      const key = `${profile.id}/${imageName}`;
      const responseUpload = await Storage.put(key, blob, access);
      // console.log('uploadPictureAPI - responseUpload', responseUpload);

      const numberOfPhotos = profile.photos.length;
      // console.log('uploadPictureAPI - numberOfPhotos:', numberOfPhotos);

      const newPhoto = {
        key: key,
        position: numberOfPhotos + 1,
        profileID: profile.id
      };

      const photo = await API.graphql(graphqlOperation(createPhoto, {input: newPhoto}));
      // console.log('uploadPictureAPI - photoSaved', photo.data.createPhoto);

      return photo.data.createPhoto;
    } catch (err) {
      console.log('Error uploading file:', err);
      return rejectWithValue([], err);
    }
  }
);

export const removePictureAPI = createAsyncThunk(
  'profile/remove/picture',
  async (image, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState().profile;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    try {
      await Storage.remove(image.key);

      await API.graphql(graphqlOperation(deletePhoto, {input: {id: image.id}}));

      return image;
    } catch (err) {
      console.log('Error remove file:', err);
      return rejectWithValue([], err);
    }

  }
)

