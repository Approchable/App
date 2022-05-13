import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASYNC_USER_STRING } from '..//..//components//config/Constant'
import {
  joinPostRequest,
  sendRequestToFireStore,
  getAllRequestIDs,
  getAllRequest,
} from '../../../FirebaseFireStore'

import uuid from 'react-native-uuid'
import { GET_ALL_REQUESTS, GET_ALL_REQUESTS_ERROR } from '../actionTypes'
import { getUserRequests } from '../../../firebase'
import { RequestStatus } from '../../components/config/Constant'

//TODO: these below actions types should be move to ../actionTypes
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
    requestStatus =  RequestStatus from ~/../../components/config/Constant
    requestID

}

*/

export const sendJoinRequest = (post, comment) => {
  console.log(comment, 'comment')
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
      requestStatus: RequestStatus.pending,
      requestID: uuid.v4().toString(),
      userReciving: post.user,
      userSendingRequest: userObject,
      createdAt: new Date(), // this should be current date
      comment: comment || '', // defualt comment will be empty
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

// get all requests actions are here

export const getRequests = (userId) => {
  return async (dispatch) => {
    try {
      const requests = await getUserRequests(userId)
      // console.log('api response of requests ===>>> ', requests);
      if (requests.length > 0) {
        dispatch({
          type: GET_ALL_REQUESTS,
          payload: {
            requests: requests,
          },
        })
      }
    } catch (err) {
      console.log(err)
      dispatch({
        type: GET_ALL_REQUESTS_ERROR,
        payload: {
          error: err,
        },
      })
    }
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

const getAllRequestsInitialState = {
  requests: [],
  errorMessage: '',
}

export function getAllRequestsReducer(
  state = getAllRequestsInitialState,
  action
) {
  switch (action.type) {
    case GET_ALL_REQUESTS:
      return {
        ...state,
        requests: action.payload.requests,
      }
    case GET_ALL_REQUESTS_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    default:
      return state
  }
}
