import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Center, FormControl, HStack, Input, Stack, Text, VStack} from 'native-base';
import {updateProfileAPI} from "../../store/actions/ProfileAction";

const MyFirstName = props => {
  const dispatch = useDispatch();
  const [firstName, onChangeFirstName] = useState('');
  const {loading, error} = useSelector((state) => state.profile);

  return (
    <Center mt={20}>
      <FormControl p={2}>
        <Stack mx={4} my={10}>
          <FormControl.Label><Text fontSize={28}>My First Name is</Text></FormControl.Label>
          <Input value={firstName} onChangeText={onChangeFirstName} placeholder="First Name" my={2} type='text'
                 size="lg" variant="underlined"/>
          <FormControl.HelperText>
            This is how you will be seen
          </FormControl.HelperText>
          <FormControl.ErrorMessage>
            Your first name is invalid
          </FormControl.ErrorMessage>
        </Stack>
        <Stack mx={4} my={6}>
          <Button isLoading={loading !== 'idle'} _loading={{bg: "primary.600"}} onPress={async (e) => {
            e.persist();
            // console.log(loading);
            // console.log(!firstName);
            if (!firstName || loading !== 'idle') return;
            const profile = {
              firstName: firstName
            };
            const result = await dispatch(updateProfileAPI(profile));
            // console.log(result);
            if (error) return;
            props.navigation.navigate('MyBirthday');
          }}>Continue</Button>
        </Stack>
      </FormControl>
    </Center>
  );
}

const styles = StyleSheet.create({});

export default MyFirstName;
