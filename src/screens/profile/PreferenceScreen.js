import React, {useCallback, useState} from 'react';
import {Box, Button, Center, CheckIcon, HStack, Select, Text, VStack} from 'native-base';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {GENDER} from "../../contants/GeneralConstants";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileAPI} from "../../store/actions/ProfileAction";
import CustomColors from "../../contants/CustomColors";

const PreferenceScreen = props => {
  const dispatch = useDispatch();
  const {profile, loading} = useSelector((state) => state.profile);
  // console.log('PreferenceScreen profile', profile);
  const {interestedIn, ageRange, location} = profile;
  const [woman, setWoman] = useState(interestedIn === GENDER.WOMAN);
  const [man, setMan] = useState(interestedIn === GENDER.MAN);
  const [everyone, setEveryone] = useState(interestedIn === GENDER.EVERYONE);

  const updateProfile = useCallback(async (inputObject) => {
    return dispatch(updateProfileAPI(inputObject));
  }, []);

  return (
    <VStack m={5}>
      <Box>
        <Text>Basic Preferences</Text>
        <Text mt={5}>I'm interested in</Text>
        <HStack justifyContent='space-around' my={10}>
          <Button bgColor={woman === true ? 'primary.200' : 'warmGray.200'} borderRadius={100} px={5} onPress={(e) => {
            e.persist();
            setWoman(true);
            setMan(false);
            setEveryone(false);
            if (loading !== 'idle') return;
            updateProfile({interestedIn: GENDER.WOMAN});
          }}><Text bold>Women</Text></Button>
          <Button bgColor={man === true ? 'primary.200' : 'warmGray.200'} borderRadius={100} px={5} onPress={(e) => {
            e.persist();
            setWoman(false);
            setMan(true);
            setEveryone(false);
            if (loading !== 'idle') return;
            updateProfile({interestedIn: GENDER.MAN});
          }}><Text bold>Men</Text></Button>
          <Button bgColor={everyone === true ? 'primary.200' : 'warmGray.200'} borderRadius={100} px={5} onPress={(e) => {
            e.persist();
            setWoman(false);
            setMan(false);
            setEveryone(true);
            if (loading !== 'idle') return;
            updateProfile({interestedIn: GENDER.EVERYONE});
          }}><Text bold>Everyone</Text></Button>
        </HStack>
        <Text>My City is</Text>
        <Center my={5}>
          <Select
            selectedValue={location}
            minWidth={200}
            accessibilityLabel="Select your city"
            placeholder="Select your city"
            onValueChange={(itemValue) => {
              if (loading !== 'idle') return;
              updateProfile({location: itemValue});
            }}
            _selectedItem={{
              bg: "primary.200",
              endIcon: <CheckIcon size={4}/>,
            }}
          >
            <Select.Item label="London" value="London"/>
            <Select.Item label="Paris" value="Paris"/>
            <Select.Item label="Toulouse" value="Toulouse"/>
          </Select>
        </Center>
      </Box>

      <Box>
        <Text>Member Preferences</Text>
        <Text mt={5}>Age Range</Text>

        <Box mt={50}>
          <Center>
            <MultiSlider
              sliderLength={280}
              min={18}
              max={100}
              step={1}
              isMarkersSeparated={true}
              values={ageRange}
              enableLabel
              enabledOne
              enabledTwo
              onValuesChangeFinish={(valuesArray) => {
                if (loading !== 'idle') return;
                updateProfile({ageRange: valuesArray});
              }}
              selectedStyle={{backgroundColor: CustomColors.primary200}}
              markerStyle={{backgroundColor: CustomColors.primary200}}
            />
          </Center>
        </Box>
      </Box>
    </VStack>
  );
}

export default PreferenceScreen;
