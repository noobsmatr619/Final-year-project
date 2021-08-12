import { combineReducers } from "redux";

import appReducer from "./appReducer";
export default combineReducers({
  app: appReducer,
});
// mount component to reducer into reducers 
