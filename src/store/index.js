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
import { RequestReducer, userRequestsReducer } from './Requests/Requests.js'
import { ReportReducer } from './Report/Report.js'
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
  GetConnectionsReducer,
  getConnectionUserReducer,
  ReportReducer,
})

export const store = createStore(RootReducer, applyMiddleware(thunk))
