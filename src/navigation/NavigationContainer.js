import React from "react";
import RootStack from "./MainNavigation";
import AuthenticationStack from "./AuthNavigation";

import {useSelector} from "react-redux";
import OnBoardingNavigation from "./OnBoardingNavigation";
import {Center, Text} from "native-base";

const MainContainer = () => {
  const isAuthed = useSelector(state => state.auth.isAuthed);
  const isOnBoardingCompleted = useSelector(state => state.currentUser.isOnBoardingCompleted);
  const error = useSelector(state => state.currentUser.error);
  // console.log('MainContainer - isOnBoardingCompleted = ', isOnBoardingCompleted);
  // console.log('MainContainer - error = ', error);
  // console.log('MainContainer - isAuthed = ', isAuthed);

  let screen;

  if (isAuthed && isOnBoardingCompleted) {
    // console.log('MainContainer - isAuthed && isOnBoardingCompleted');
    screen = <RootStack/>;
  } else if (isAuthed && !isOnBoardingCompleted && !error) {
    screen = <OnBoardingNavigation/>;
  } else if (error) {
    screen = (
      <Center flex={1}>
        <Text>Oops. Trouble ahead, come back in a few.</Text>
        <Text>We apologies for the inconvenience.</Text>
        <Text>Before you leave, did you check your internet connection?</Text>
      </Center>
    )
  } else {
    screen = <AuthenticationStack/>;
  }

  return (
    screen
  );
};

export default MainContainer;
