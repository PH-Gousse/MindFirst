import React, {useState} from 'react';

import {StyleSheet} from "react-native";
import {Button, Center, CheckIcon, FormControl, Select, Stack, Text} from "native-base";
import {updateUserAPI} from "../../store/actions/UserAction";
import {setIsProfileCompleted} from "../../store/reducers/CurrentUserSlice";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileAPI} from "../../store/actions/ProfileAction";


const MyLocation = props => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const {loading, error} = useSelector((state) => state.profile);

  return (
    <Center mt={20}>
      <FormControl p={2}>
        <Stack mx={4} my={10}>
          <FormControl.Label><Text fontSize={28}>My City is</Text></FormControl.Label>
          <Select
            selectedValue={city}
            minWidth={200}
            accessibilityLabel="Select your city"
            placeholder="Select your city"
            onValueChange={(itemValue) => setCity(itemValue)}
            _selectedItem={{
              bg: "cyan.600",
              endIcon: <CheckIcon size={4}/>,
            }}
          >
            <Select.Item label="London" value="London"/>
            <Select.Item label="Paris" value="Paris"/>
            <Select.Item label="Toulouse" value="Toulouse"/>
          </Select>
        </Stack>
        <Stack mx={4} my={6}>
          <Button isLoading={loading !== 'idle'} _loading={{bg: "primary.600"}} onPress={async (e) => {
            e.persist();
            if (loading !== 'idle') return;
            if (!city) return;

            const user = {
              isOnBoardingCompleted: true,
            };
            const resultUserUpdate = await dispatch(updateUserAPI(user));

            const profile = {
              location: city
            };
            const resultProfileUpdate = await dispatch(updateProfileAPI(profile));

            dispatch(setIsProfileCompleted(true));
          }}>Continue</Button>
        </Stack>
      </FormControl>

    </Center>
  )
};

const styles = StyleSheet.create({});

export default MyLocation;
