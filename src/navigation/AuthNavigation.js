import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import SignUpScreen from "../screens/OnBoarding/auth/SignUpScreen";
import WelcomeScreen from "../screens/OnBoarding/auth/WelcomeScreen";
import MyCode from "../screens/OnBoarding/auth/MyCode";

const AuthStack = createStackNavigator();

const AuthenticationStack = (props) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={() => {return {headerTitle: 'Mind First'}}}/>
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={() => {return {headerTitle: ''}}}/>
      <AuthStack.Screen name="MyCode" component={MyCode} options={() => {return {headerTitle: 'My Code'}}}/>
    </AuthStack.Navigator>
  )
}

export default AuthenticationStack;
