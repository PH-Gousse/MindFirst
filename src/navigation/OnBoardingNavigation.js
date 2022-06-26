import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import MyFirstName from "../screens/OnBoarding/MyFirstName";
import MyBirthday from "../screens/OnBoarding/MyBirthday";
import MyGender from "../screens/OnBoarding/MyGender";
import MyInterest from "../screens/OnBoarding/MyInterest";
import MyPictures from "../screens/OnBoarding/MyPictures";
import MyLocation from "../screens/OnBoarding/MyLocation";

const OnBoardingStack = createStackNavigator();

const OnBoardingNavigationStack = (props) => {
  return (
    <OnBoardingStack.Navigator>
      <OnBoardingStack.Screen name="MyFirstName" component={MyFirstName} options={() => {return {headerTitle: 'My First Name'}}}/>
      <OnBoardingStack.Screen name="MyBirthday" component={MyBirthday} options={() => {return {headerTitle: 'My Birthday'}}}/>
      <OnBoardingStack.Screen name="MyGender" component={MyGender} options={() => {return {headerTitle: 'My Gender'}}}/>
      <OnBoardingStack.Screen name="MyInterest" component={MyInterest} options={() => {return {headerTitle: 'My Interest'}}}/>
      <OnBoardingStack.Screen name="MyPictures" component={MyPictures} options={() => {return {headerTitle: 'My Pictures'}}}/>
      <OnBoardingStack.Screen name="MyLocation" component={MyLocation} options={() => {return {headerTitle: 'My Location'}}}/>
    </OnBoardingStack.Navigator>
  )
}

export default OnBoardingNavigationStack;
