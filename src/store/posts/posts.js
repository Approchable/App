import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteUserData,
  getPostsFromFireStore,
  sendPostToFireStore,
  writeUserData,
} from '..//../../firebase';

const ADD_TO_POST_OBJECT = 'ADD_TO_POST_OBJECT';
const REMOVE_FROM_POST_OBJECT = 'REMOVE_FROM_POST_OBJECT';
const CLEAR_POST_OBJECT = 'CLEAR_POST_OBJECT';

export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_LOADING = 'GET_POSTS_LOADING';
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_LOADING = 'CREATE_POST_LOADING';
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR';

const initialPostObject = {};

//actions
export const addToPostObject = data => {
 

  return {
    type: ADD_TO_POST_OBJECT,
    payload: {
      data: data,
    },
  };
};

export const removeFromPostObject = key => {
  return {
    type: REMOVE_FROM_POST_OBJECT,
    payload: {
      key: key,
    },
  };
};

// // adding old actions not connected yet to the// please connect these actions in the future and also remove them from actions.js

// export const getPosts = () => {
//     // get posts from firebase
//     return async dispatch => {
//       dispatch({
//         type: GET_POSTS_LOADING,
//         payload: {
//           loading: true,
//         },
//       });
//       try {
//         const posts = await getPostsFromFireStore();
//         if (posts !== null) {
//           dispatch({
//             type: GET_POSTS,

//             payload: {
//               posts: posts,
//               loading: false,
//             },
//           });
//         }
//       } catch (err) {
//         console.log(err);
//         dispatch({
//           type: GET_POSTS_ERROR,
//           payload: {
//             error: err,
//             loading: false,
//           },
//         });
//       }
//     };
//   };

//   export const createPosts = postObject => {
//     // create post in firebase using oist object and dispatch the ref to the object
//     return async dispatch => {
//       dispatch({
//         type: CREATE_POST_LOADING,
//         payload: {
//           loading: true,
//         },
//       });
//       try {
//         const ref = await sendPostToFireStore(postObject);
//         if (ref !== null) {
//           dispatch({
//             type: CREATE_POST,
//             payload: {
//               ref: ref,
//               loading: false,
//             },
//           });
//         }
//       } catch (err) {
//         console.log(err);
//         dispatch({
//           type: CREATE_POST_ERROR,
//           payload: {
//             error: err,
//             loading: false,
//           },
//         });
//       }
//     };
//   };

//reducers

export const postsReducer = (state = initialPostObject, action) => {
  switch (action.type) {
    case ADD_TO_POST_OBJECT:
      return {
        ...state,
        // [action.payload.key]: action.payload.value,
        ...action.payload.data,
      };
    case REMOVE_FROM_POST_OBJECT:
      return {
        ...state,
        [action.payload.key]: null,
      };
    case CLEAR_POST_OBJECT:
      return {};
    default:
      return state;
  }
};
