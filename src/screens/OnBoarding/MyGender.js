import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Button, Center, FormControl, Stack, Text} from 'native-base';
import {updateProfileAPI} from "../../store/actions/ProfileAction";
import {GENDER} from "../../contants/GeneralConstants";

const MyGender = props => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.profile);
  const [woman, setWoman] = useState(false);
  const [man, setMan] = useState(false);
  const [gender, onChangeGender] = useState('');

  return (
    <Center mt={20}>
      <FormControl p={2}>
        <Stack mx={4} my={10}>
          <Text fontSize={28}>I am a</Text>
          <Button.Group colorScheme={'light'} variant={'outline'} space={2} my={2} direction='column'>
            <Button variant={woman ? 'solid' : 'outline'} borderRadius={100} px={5} mt={10} onPress={(e) => {
              e.persist();
              setWoman(true);
              setMan(false);
              onChangeGender(GENDER.WOMAN);
            }}>Woman</Button>
            <Button variant={man ? 'solid' : 'outline'} borderRadius={100} px={5} mt={5} onPress={(e) => {
              e.persist();
              setWoman(false);
              setMan(true);
              onChangeGender(GENDER.MAN);
            }}>Man</Button>
          </Button.Group>
        </Stack>
        <Stack mx={4} my={6}>
          <Button isLoading={loading !== 'idle'} _loading={{bg: "primary.600"}} onPress={async (e) => {
            e.persist();
            // console.log(gender);
            if (loading !== 'idle') return;
            const profile = {
              gender: gender
            };
            const result = await dispatch(updateProfileAPI(profile));
            // console.log(result);
            props.navigation.navigate('MyInterest');
          }}>Continue</Button>
        </Stack>
      </FormControl>
    </Center>
  );
}

const styles = StyleSheet.create({});

export default MyGender;
