import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Box, Button, Input, Text, VStack} from 'native-base';
import {useDispatch, useSelector} from "react-redux";
import {updateProfileAPI} from "../../store/actions/ProfileAction";

const EditInfoScreen = props => {
  const dispatch = useDispatch();
  const {profile, loading} = useSelector((state) => state.profile);
  const {firstName, shortDescription} = profile;
  const [name, setName] = useState(firstName);
  const [description, setDescription] = useState(shortDescription);

  return (
    <VStack m={5}>
      <Box>
        <Text>Name</Text>
        <Input my={5} size="lg" variant="underlined" value={name}
               onChangeText={setName}
        />
      </Box>

      <Box my={5}>
        <Text>Description</Text>
        <Input my={5} size="lg" variant="underlined" value={description}
               onChangeText={setDescription}
        />
      </Box>

      <Box>
        <Button isLoading={loading !== 'idle'} _loading={{bg: "primary.600"}} onPress={async (e) => {
          e.persist();
          // console.log(firstName);
          if (!name || loading !== 'idle') return;
          const profile = {
            firstName: name,
            shortDescription: description
          };
          const result = await dispatch(updateProfileAPI(profile));
          // console.log(result);
          props.navigation.goBack();
        }}>Save</Button>
      </Box>

    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  }
});

export default EditInfoScreen;
