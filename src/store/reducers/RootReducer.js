import {combineReducers} from "redux";
import CurrentUserSlice from "./CurrentUserSlice";
import AuthSlice from "./AuthSlice";
import ProfileSlice from "./ProfileSlice";
import ChatSlice from "./ChatSlice";
import BlockedUserSlice from "./BlockedUserSlice";

const rootReducer = combineReducers({
  currentUser: CurrentUserSlice,
  auth: AuthSlice,
  profile: ProfileSlice,
  chat: ChatSlice,
  blockedUser: BlockedUserSlice
});

export default rootReducer;
