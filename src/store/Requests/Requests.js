import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASYNC_USER_STRING } from '..//..//components//config/Constant'
import {
  joinPostRequest,
  sendRequestToFireStore,
  getAllRequestIDs,
} from '../../../FirebaseFireStore'

import uuid from 'react-native-uuid'
// action types

const SEND_REQUEST_LOADING = 'SET_REQUEST_LOADING'
const SEND_REQUEST_SUCCESS = 'SET_REQUEST_SUCCESS'
const SEND_REQUEST_FAILURE = 'SET_REQUEST_FAILURE'

const REJECT_REQUEST = 'REJECT_REQUEST'
const ACCEPT_REQUEST = 'ACCEPT_REQUEST'
const ACCEPT_REQUEST_LOADING = 'ACCEPT_REQUEST_LOADING'
const ACCEPT_REQUEST_SUCCESS = 'ACCEPT_REQUEST_SUCCESS'
const ACCEPT_REQUEST_FAILURE = 'ACCEPT_REQUEST_FAILURE'
const REJECT_REQUEST_LOADING = 'REJECT_REQUEST_LOADING'
const REJECT_REQUEST_SUCCESS = 'REJECT_REQUEST_SUCCESS'
const REJECT_REQUEST_FAILURE = 'REJECT_REQUEST_FAILURE'

const GET_REQUESTS = 'GET_REQUESTS'
const GET_REQUESTS_LOADING = 'GET_REQUESTS_LOADING'
const GET_REQUESTS_SUCCESS = 'GET_REQUESTS_SUCCESS'
const GET_REQUESTS_FAILURE = 'GET_REQUESTS_FAILURE'

// action creators

/*
requestObject =
{
    postObject
    requestStatus =  rejected | pending | accepted | completed
    requestID
}
*/

export const sendJoinRequest = (post) => {
  return async (dispatch) => {
    dispatch({ type: SEND_REQUEST_LOADING })
    const user = await AsyncStorage.getItem('user')
    if (!user) {
      dispatch({
        type: SEND_REQUEST_FAILURE,
        payload: {
          errorMessage: 'User not found',
        },
      })
      return
    }
    const userObject = JSON.parse(user)
    const requestObject = {
      postObject: post,
      requestStatus: 'pending',
      requestID: uuid.v4().toString(),
      userReciving: post.user,
      userSendingRequest: userObject,
    }
    console.log('postUserId ', post.user.id)
    console.log('userSendingRequestObjectId ', userObject.id)

    const requestSent = await sendRequestToFireStore(requestObject)
    // the requester joins request array in the post

    const JoinPostRequest = await joinPostRequest(post.postId, userObject.id)
    if (requestSent === null) {
      dispatch({
        type: SEND_REQUEST_FAILURE,
        payload: {
          errorMessage: 'Error sending request',
        },
      })
      return
    }
    dispatch({
      type: SEND_REQUEST_SUCCESS,
      payload: {
        requestObject: requestObject,
        firebaseDocRef: requestSent,
      },
    })
    return
  }
}

export const getusersWhoRequested = (postId) => {
  //console.log('getusersWhoRequested' , postId);
  if (postId === null || postId === undefined || postId === '') {
    console.log('postId is null')
    dispatch({
      type: GET_REQUESTS_FAILURE,
      payload: {
        errorMessage: 'Post not found',
      },
    })
    return
  }
  return async (dispatch) => {
    dispatch({ type: GET_REQUESTS_LOADING })
    const requestIds = await getAllRequestIDs(postId)
    if (requestIds.length === 0) {
      dispatch({
        type: GET_REQUESTS_SUCCESS,
        payload: {
          usersWhoRequested: [],
          loading: false,
        },
      })
      return
    }
    dispatch({
      type: GET_REQUESTS_SUCCESS,
      payload: {
        usersWhoRequested: requestIds,
        loading: false,
      },
    })
  }
}

//reducers
const requestInitialState = {
  requestObject: {},
  requestStatus: '',
  firebaseDocRef: {},
  isLoading: false,
  errorMessage: '',
}

export function RequestReducer(state = requestInitialState, action) {
  switch (action.type) {
    case SEND_REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case SEND_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requestObject: action.payload.requestObject,
        firebaseDocRef: action.payload.firebaseDocRef,
      }
    case SEND_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      }
    default:
      return state
  }
}

const userRequestIdsInitialState = {
  usersWhoRequested: [],
  isLoading: false,
}

export function userRequestsReducer(
  state = userRequestIdsInitialState,
  action
) {
  switch (action.type) {
    case GET_REQUESTS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case GET_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersWhoRequested: action.payload.usersWhoRequested,
      }
    case GET_REQUESTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      }
    default:
      return state
  }
}
