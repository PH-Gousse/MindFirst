import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import monitorReducersEnhancer from './config/enhancers/monitorReducer'
import loggerMiddleware from './config/middleware/logger'
import rootReducer from "./reducers/RootReducer";

export default function configureAppStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false
    }).concat(loggerMiddleware),
    devTools: true,
    preloadedState,
    enhancers: [],
  })
}


// {
//   ignoredActions: [
//     'authSlice/signUp/fulfilled', 'authSlice/confirmSignUp/pending', 'authSlice/confirmSignUp/fulfilled',
//     'currentUser/get/user/pending', 'currentUser/get/user/rejected', 'currentUser/get/user/fulfilled',
//     'currentUser/create/fulfilled', 'currentUser/create/rejected', 'currentUser/create/pending',
//     'currentUserSlice/setPhoneNumber',
//     'currentUser/update/profile/fulfilled', 'currentUser/update/profile/pending', 'currentUser/update/profile/rejected'
//   ]
// }
