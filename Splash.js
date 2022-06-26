import {StyleSheet, View} from "react-native";
import {extendTheme, NativeBaseProvider} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import MainContainer from "./src/navigation/NavigationContainer";
import {useDispatch} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {getUserAPI} from "./src/store/actions/UserAction";
import {getCurrentUserAuth} from "./src/store/actions/AuthAction";
import {setIsAuthed} from "./src/store/reducers/AuthSlice";

const theme = extendTheme({
  colors: {
    primary: {
      900: '#da5101',
      800: '#e46a02',
      700: '#ea7903',
      600: '#f08904',
      500: '#f49406',
      400: '#f5a328',
      300: '#f7b44d',
      200: '#f9c980',
      100: '#fbdeb2',
      50: '#fdf2e0',
    },
  },
  components: {
    Button: {
      baseStyle: {},
      defaultProps: {
        colorScheme: 'primary',
      },
      variants: {},
      sizes: {},
    },
    Spinner: {
      defaultProps: {
        colorScheme: 'primary',
      },
    }
  }
});

const Splash = () => {
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        const cognitoUser = await dispatch(getCurrentUserAuth());
        // console.log('cognitoUser', cognitoUser);
        if (cognitoUser.payload && cognitoUser.payload.username) {
          // console.log('Splash - cognitoUser', cognitoUser.payload.username);
          const user = await dispatch(getUserAPI(cognitoUser.payload.username));
          if (user.payload && user.payload.isOnBoardingCompleted) {
            // console.log('Splash - user', user.payload.isOnBoardingCompleted);
            dispatch(setIsAuthed(true));
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    // console.log('Splash - prepare');
    prepare().then(() => {
      setAppIsReady(true);
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    // console.log('Splash - onLayoutRootView');
    if (appIsReady) {
      // console.log('Splash - onLayoutRootView - appIsReady');
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // console.log('Splash - !appIsReady');
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} onLayout={onLayoutRootView}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <MainContainer/>
        </NavigationContainer>
      </NativeBaseProvider>
    </View>
  )
};
export default Splash;
