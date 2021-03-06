import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  AuthReducer,
  NavReducer,
  CreatePostsReducer,
  GetConnectionsReducer,
  getConnectionUserReducer,
} from './reducers.js'
import { postsReducer, GetPostsReducer } from './posts/posts.js'
import WaitlistReducer from './WaitList/Waitlist.js'
import {
  RequestReducer,
  userRequestsReducer,
  getAllRequestsReducer,
} from './Requests/Requests.js'

const RootReducer = combineReducers({
  AuthReducer,
  NavReducer,
  CreatePostsReducer,
  GetPostsReducer,
  WaitlistReducer,
  postsReducer,
  RequestReducer,
  userRequestsReducer,
  GetConnectionsReducer,
  getConnectionUserReducer,
  getAllRequestsReducer,
})

export const store = createStore(RootReducer, applyMiddleware(thunk))
