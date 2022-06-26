import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button, Center, Stack} from 'native-base';
import EditMyPictures from "../profile/EditMyPictures";

const MyPictures = props => {
  const {profile, loading} = useSelector((state) => state.profile);
  const {photos} = profile;

  return (
    <>
      <EditMyPictures/>
      <Stack mx={4} mb={6}>
        <Button isLoading={loading !== 'idle'} _loading={{bg: "primary.600"}} onPress={async (e) => {
          e.persist();
          if (loading !== 'idle') return;
          if (photos.length <= 0) return;

          props.navigation.navigate('MyLocation');
        }}>Continue</Button>
      </Stack>
    </>
  );
}

export default MyPictures;
