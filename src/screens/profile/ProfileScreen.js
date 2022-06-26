import React from 'react';
import {Box, Text, VStack, HStack, IconButton, Icon} from 'native-base';
import PhotoProfileCarousel from "../../components/profile/PhotoProfileCarousel";
import MainInfoProfile from "../../components/profile/MainInfoProfile";
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from "react-redux";

const ProfileScreen = props => {
  // console.log('ProfileScreen RENDERED');
  const {profile} = useSelector(state => state.profile);
  const {firstName, birthday, shortDescription, location, photos} = profile;
  // console.log('ProfileScreen photos', photos);

  return (
    <Box>
      <PhotoProfileCarousel photos={photos} />

      <MainInfoProfile
        name={firstName}
        age={birthday}
        description={shortDescription}
        location={location}
      />

      <VStack mt={5}>
        <HStack justifyContent='space-around' mx={5}>
          <VStack alignItems='center'>
            <IconButton
              onPress={(e) => {
                e.persist();
                props.navigation.navigate('PreferenceScreen');
              }}
              variant={'ghost'}
              icon={
                <Icon size={'2xl'} as={<Ionicons name="ios-options"/>}/>
              }
            />
            <Text>Preferences</Text>
          </VStack>


          <Box>
            <IconButton
              onPress={(e) => {
                e.persist();
                props.navigation.navigate('EditMyPictures');
              }}
              variant={'ghost'}
              icon={
                <Icon size={'2xl'} as={<Ionicons name="camera-outline"/>}/>
              }
            />
            <Text>My pictures</Text>
          </Box>

          <Box>
            <IconButton
              onPress={(e) => {
                e.persist();
                props.navigation.navigate('EditInfoScreen');
              }}
              variant={'ghost'}
              icon={
                <Icon size={'2xl'} as={<Ionicons name="pencil"/>}/>
              }
            />
            <Text>Edit Info</Text>
          </Box>
        </HStack>

        <HStack justifyContent='space-around' mt={5}>
          <VStack alignItems='center'>
            <Box>
              <IconButton
                onPress={(e) => {
                  e.persist();
                  props.navigation.navigate('AccountScreen');
                }}
                variant={'ghost'}
                icon={
                  <Icon size={'xl'} as={<Ionicons name="settings"/>}/>
                }
              />
              <Text>Account</Text>
            </Box>
          </VStack>
        </HStack>

      </VStack>

    </Box>
  );
}

export default ProfileScreen;
