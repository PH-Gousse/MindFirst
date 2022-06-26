import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Button, Center, Stack, Text, VStack} from 'native-base';
import {signUpAuth} from "../../../store/actions/AuthAction";
import {setPhoneNumber} from "../../../store/reducers/CurrentUserSlice";
import PhoneInput from "react-native-phone-number-input";

const SignUpScreen = props => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.auth);
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const phoneInput = useRef(null);

  return (
    <Center mt={20}>
      <VStack>
        <Stack mx={4}>
          <Text fontSize={28} mb={5}>My Phone number is</Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="GB"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
              setIsValid(false);
            }}
            withDarkTheme
            autoFocus
          />
        </Stack>
        <Stack mx={4} my={6}>
          <Button isLoading={isValid} _loading={{bg: "primary.600"}} onPress={async (e) => {
            e.persist();
            // console.log(loading);
            if (loading !== 'idle') return;
            const checkValid = phoneInput.current?.isValidNumber(value);
            const phoneNumber = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
            // console.log('SignUpScreen - phoneNumber:', phoneNumber);
            if (checkValid) {
              setIsValid(true);
              dispatch(setPhoneNumber(phoneNumber.formattedNumber));
              const cognitoUser = await dispatch(signUpAuth(phoneNumber.formattedNumber));
              // console.log('SignUpScreen', cognitoUser);
              // console.log('SignUpScreen', cognitoUser.payload);
              props.navigation.navigate('MyCode', {
                cognitoUser: cognitoUser.payload
              });
            }

          }}>Continue</Button>
        </Stack>
      </VStack>
    </Center>
  );
}

const styles = StyleSheet.create({});

export default SignUpScreen;
