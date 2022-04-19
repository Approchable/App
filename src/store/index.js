import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {AuthReducer, NavReducer ,CreatePostsReducer , GetPostsReducer} from './reducers.js';
import WaitlistReducer from './WaitList/Waitlist.js';

const RootReducer = combineReducers({
  ///
  AuthReducer,
  NavReducer,
  CreatePostsReducer,
  GetPostsReducer,
  WaitlistReducer,
});

export const store = createStore(RootReducer, applyMiddleware(thunk));
