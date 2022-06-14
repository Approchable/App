import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  deleteUserData,
  getPostsFromFireStore,
  sendPostToFireStore,
  writeUserData,
} from '..//../../firebase'

const ADD_TO_POST_OBJECT = 'ADD_TO_POST_OBJECT'
const REMOVE_FROM_POST_OBJECT = 'REMOVE_FROM_POST_OBJECT'
const CLEAR_POST_OBJECT = 'CLEAR_POST_OBJECT'

export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_LOADING = 'GET_POSTS_LOADING'
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR'

export const CREATE_POST = 'CREATE_POST'
export const CREATE_POST_LOADING = 'CREATE_POST_LOADING'
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR'
export const UPDATE_POST_OBJECT = 'UPDATE_POST_OBJECT'

export const FETCH_NEW_POST = 'FETCH_NEW_POST'
export const FETCH_NEW_POST_LOADING = 'FETCH_NEW_POST_LOADING'
export const FETCH_NEW_POST_ERROR = 'FETCH_NEW_POST_ERROR'

const initialPostObject = {}

//actions
export const addToPostObject = (data) => {
  return {
    type: ADD_TO_POST_OBJECT,
    payload: {
      data: data,
    },
  }
}

export const removeFromPostObject = (key) => {
  return {
    type: REMOVE_FROM_POST_OBJECT,
    payload: {
      key: key,
    },
  }
}

export const updatePostObject = (someObject) => {
  // rereive objects from firebase
  // update state of redux
  // have another variable for loading
  //call the varible fetchLoading
}

// adding old actions not connected yet to the// please connect these actions in the future and also remove them from actions.js

export const getPosts = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_POSTS_LOADING,
      payload: {
        loading: true,
      },
    })
    try {
      const posts = await getPostsFromFireStore()
      console.log(posts, 'pst')
      if (posts !== null) {
        dispatch({
          type: GET_POSTS,
          payload: {
            posts: posts,
            loading: false,
          },
        })
      }
    } catch (err) {
      console.log(err)
      dispatch({
        type: GET_POSTS_ERROR,
        payload: {
          error: err,
          loading: false,
        },
      })
    }
  }
}

export const createPosts = (postObject) => {
  // create post in firebase using oist object and dispatch the ref to the object
  return async (dispatch) => {
    dispatch({
      type: CREATE_POST_LOADING,
      payload: {
        loading: true,
      },
    })
    try {
      const ref = await sendPostToFireStore(postObject)
      if (ref !== null) {
        dispatch({
          type: CREATE_POST,
          payload: {
            ref: ref,
            loading: false,
          },
        })
      }
    } catch (err) {
      console.log(err)
      dispatch({
        type: CREATE_POST_ERROR,
        payload: {
          error: err,
          loading: false,
        },
      })
    }
  }
}

const fetchNewPosts = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_NEW_POST_LOADING,
      payload: {
        loading: true,
      },
    })
    try {
      const posts = await getPostsFromFireStore() // update function to get new posts
      if (posts !== null) {
        dispatch({
          type: FETCH_NEW_POST,
          payload: {
            posts: posts,
            loading: false,
          },
        })
      } else {
        dispatch({
          type: FETCH_NEW_POST_ERROR,
          payload: {
            error: 'No posts to fetch',
            loading: false,
          },
        })
      }
    } catch (err) {
      console.log(err)
      dispatch({
        type: FETCH_NEW_POST_ERROR,
        payload: {
          error: err,
          loading: false,
        },
      })
    }
  }
}

//reducers

export const postsReducer = (state = initialPostObject, action) => {
  switch (action.type) {
    case ADD_TO_POST_OBJECT:
      return {
        ...state,
        // [action.payload.key]: action.payload.value,
        ...action.payload.data,
      }
    case REMOVE_FROM_POST_OBJECT:
      return {
        ...state,
        [action.payload.key]: null,
      }
    case CLEAR_POST_OBJECT:
      return {}
    case UPDATE_POST_OBJECT:
      return {
        ...state,
      }

    default:
      return state
  }
}

const getPostInitialState = {
  posts: [],
  loading: true,
}

export function GetPostsReducer(state = getPostInitialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        loading: action.payload.loading,
      }
    case GET_POSTS_LOADING:
      console.log('GET_POSTS_LOADING')
      return {
        ...state,
        loading: action.payload.loading,
      }
    case GET_POSTS_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: action.payload.loading,
      }
    default:
      return state
  }
}
