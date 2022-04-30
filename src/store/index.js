import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  AuthReducer,
  NavReducer,
  CreatePostsReducer,
  GetPostsReducer,
  GetConnectionsReducer,
  getConnectionUserReducer
} from './reducers.js';
import { postsReducer } from "./posts/posts.js";
import WaitlistReducer from './WaitList/Waitlist.js';

const RootReducer = combineReducers({
  ///
  AuthReducer,
  NavReducer,
  CreatePostsReducer,
  GetPostsReducer,
  WaitlistReducer,
  postsReducer,
  GetConnectionsReducer,
  getConnectionUserReducer
});

export const store = createStore(RootReducer, applyMiddleware(thunk));
