import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {AuthReducer, NavReducer ,CreatePostsReducer , GetPostsReducer} from './reducers.js';
import {postsReducer} from "./posts/posts.js";
import WaitlistReducer from './WaitList/Waitlist.js';
import {RequestReducer ,userRequestsReducer} from './Requests/Requests.js';


const RootReducer = combineReducers({
  ///
  AuthReducer,
  NavReducer,
  CreatePostsReducer,
  GetPostsReducer,
  WaitlistReducer,
  postsReducer,
  RequestReducer,
  userRequestsReducer,

});

export const store = createStore(RootReducer, applyMiddleware(thunk));
