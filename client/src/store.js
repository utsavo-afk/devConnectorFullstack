import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// reducers
import alertReducer from "./reducers/alertReducer";
import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postReducer";
import profileReducer from "./reducers/profileReducer";

const reducers = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  profiles: profileReducer,
  posts: postReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
