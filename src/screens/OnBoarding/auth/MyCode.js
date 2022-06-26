import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Button, Center, FormControl, Input, Stack, Text} from 'native-base';
import {confirmSignUpAuth} from "../../../store/actions/AuthAction";


const MyCode = props => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.auth);
  const [code, onChangeCode] = useState('');
  const { cognitoUser } = props.route.params;

  if (error && error.message) {
    return (
      <Center>
        <Text>{error.message}</Text>
      </Center>
    )
  }

  return (
    <Center mt={20}>
      <FormControl p={2}>
        <Stack mx={4} my={10}>
          <FormControl.Label><Text fontSize={28}>My confirmation code is</Text></FormControl.Label>
          <Input value={code} onChangeText={onChangeCode} placeholder="Confirmation code" my={2} type='number-pad'
                 keyboardType='number-pad' size="lg" variant="underlined"/>
          <FormControl.HelperText>
            Check your SMS
          </FormControl.HelperText>
          <FormControl.ErrorMessage>
            Invalid code
          </FormControl.ErrorMessage>
        </Stack>
        <Stack mx={4} my={6}>
          <Button isLoading={loading !== 'idle'} _loading={{bg: "primary.600"}} onPress={async (e) => {
            e.persist();
            if (loading !== 'idle') return;
            const signUpArg = {
              code: code,
              cognitoUser: cognitoUser
            }
            // console.log('MyCode', signUpArg);
            await dispatch(confirmSignUpAuth(signUpArg));
          }}>Continue</Button>
        </Stack>
      </FormControl>
    </Center>
  );
}

const styles = StyleSheet.create({});

export default MyCode;
