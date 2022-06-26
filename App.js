import React from 'react';
import {LogBox} from 'react-native';
import 'react-native-get-random-values';
import configureAppStore from './src/store/StoreConfiguration';
import {Provider} from 'react-redux';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import Splash from "./Splash";

Amplify.configure(config);

// Amplify.Logger.LOG_LEVEL = 'DEBUG';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const store = configureAppStore({});

function App() {

  return (
    <Provider store={store}>
      <Splash/>
    </Provider>
  );
}

export default App;
