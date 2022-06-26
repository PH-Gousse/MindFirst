import {Center, Icon, IconButton, Stack, Text, VStack} from "native-base";
import React from "react";
import PicturesGrid from "../../components/profile/PicturesGrid";
import {Ionicons} from "@expo/vector-icons";
import pickImageHelper from "../../helpers/Images/pickImage";
import {removePictureAPI, uploadPictureAPI} from "../../store/actions/StorageAction";
import {useDispatch, useSelector} from "react-redux";
import {reOrderPhotosAPI} from "../../store/actions/ProfileAction";
import {setProfilePhotos} from "../../store/reducers/ProfileSlice";

const EditMyPictures = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.profile);
  const {photos} = profile;
  // console.log('EditMyPictures - photos', photos);

  const pickImageHandler = async () => {
    const image = await pickImageHelper();
    if (!image.cancelled) {
      const photo = {
        uri: image.uri,
      }
      // console.log('EditMyPictures - photo', photo);
      await dispatch(uploadPictureAPI(photo));
    }
  };

  const onReorder = async (photos) => {
    const photosMap = photos.map((photo, index) => Object.assign({}, photo, {position: index + 1}));
    dispatch(reOrderPhotosAPI(photosMap));
    dispatch(setProfilePhotos(photosMap));
  }

  const onRemove = async (photo) => {
    await dispatch(removePictureAPI(photo));
  };

  return (
    <VStack flex={1} justifyContent='space-between'>
      <Stack>
        <PicturesGrid photos={photos} onReorder={onReorder} onRemove={onRemove}/>
      </Stack>
      <Center>
        <Stack mx={4} my={4} alignItems={'center'}>
          <IconButton
            onPress={pickImageHandler}
            variant={'ghost'}
            icon={
              <Icon size={'xl'} as={<Ionicons name="camera-outline"/>}/>
            }
          />
          <Text>Add pictures</Text>
        </Stack>
      </Center>
    </VStack>
  )
};

export default EditMyPictures;
