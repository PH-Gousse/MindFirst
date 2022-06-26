import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Center, FormControl, HStack, Input, Stack, Text, VStack} from 'native-base';
import MaskInput, { Masks } from 'react-native-mask-input';
import {updateProfileAPI} from '../../store/actions/ProfileAction';

const MyBirthday = props => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.profile);
  const [birthday, onChangeBirthday] = useState('');

  return (
    <Center mt={20}>
      <FormControl p={2}>
        <Stack mx={4} my={10}>
          <FormControl.Label><Text fontSize={28} mb={10}>My Birthday is</Text></FormControl.Label>
          <MaskInput
            value={birthday}
            onChangeText={(masked, unmasked, obfuscated) => {
              onChangeBirthday(masked); // you can use the unmasked value as well
            }}
            mask={Masks.DATE_DDMMYYYY}
            textAlign={'center'}
            keyboardType='number-pad'
            autoFocus
            style={{fontSize: 30}}
          />
          <FormControl.HelperText mt={10}>
            Your age will be public
          </FormControl.HelperText>
          <FormControl.ErrorMessage>
            Incomplete birthday date
          </FormControl.ErrorMessage>
        </Stack>
        <Stack mx={4} my={6}>
          <Button isLoading={loading !== 'idle'} _loading={{bg: "primary.600"}} onPress={async (e) => {
            e.persist();
            // console.log(birthday);
            if (!birthday || loading !== 'idle') return;
            const profile = {
              birthday: birthday
            };
            const result = await dispatch(updateProfileAPI(profile));
            // console.log(result);
            props.navigation.navigate('MyGender');
          }}>Continue</Button>
        </Stack>
      </FormControl>
    </Center>
  );
}

const styles = StyleSheet.create({});

export default MyBirthday;
