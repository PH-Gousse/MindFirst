import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Stack, Text, VStack} from 'native-base';
import {useDispatch} from "react-redux";
import {Auth} from "aws-amplify";
import {signOutAuth} from "../../store/actions/AuthAction";
import AlertDialogComponent from "../../components/UI/AlertDialogComponent";
import {updateUserAPI} from "../../store/actions/UserAction";

const AccountScreen = props => {
  const dispatch = useDispatch();

  const deleteCurrentUserAccount = useCallback(async () => {
    const user = {
      status: 'toDelete',
    }
    await dispatch(updateUserAPI(user));
    await dispatch(signOutAuth());
  }, []);

  return (
    <VStack mx={4} my={6} flex={1} justifyContent={'space-between'}>
      <Stack>
        <Stack my={6}>
            <Button onPress={async (e) => {
              e.persist();
              try {
                const data = await Auth.signOut();
                // console.log('signOut', data)
                // logout
                await dispatch(signOutAuth());
              } catch (err) {
                console.error('Error signOut', err);
              }
            }}>LOGOUT</Button>
        </Stack>
      </Stack>
      <Stack>
        <Stack my={6}>
          <AlertDialogComponent onDeletePressed={deleteCurrentUserAccount}/>
        </Stack>
        <Stack>
          <Text>New Build Number: 1.1.1</Text>
        </Stack>
      </Stack>
    </VStack>
  );
}

const styles = StyleSheet.create({});

export default AccountScreen;
