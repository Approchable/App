import {
  LOGIN,
  LOGOUT,
  OPEN_CREATE_POST_NAV,
  CLOSE_CREATE_POST_NAV,
  GET_POSTS,
  GET_POSTS_LOADING,
  GET_POSTS_ERROR,
  CREATE_POST,
  CREATE_POST_LOADING,
  CREATE_POST_ERROR,
} from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteUserData,
  getPostsFromFireStore,
 
  writeUserData,

} from '../../firebase';

import {  sendPostToFireStore } from '../../FirebaseFireStore';

export const Init = () => {
  //console.log('Initing user....');
  return async dispatch => {
    try {
      var data = await AsyncStorage.getItem('user');
      data = JSON.parse(data);
     // console.log('user found', data);
      if (data === null || data === undefined) {
        dispatch({
          type: LOGIN,
          payload: {
            id: null,
          },
        });
      }
      if (data !== null || data !== undefined) {
        dispatch({
          type: LOGIN,
          payload: {
            id: data.id,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const login = data => {
  return async dispatch => {
    try {
      console.log('in login action with user data: ' , data);
      await AsyncStorage.setItem('user', JSON.stringify(data));
      
      dispatch({
        type: LOGIN,
        payload: {
          id: data.id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      var user = await AsyncStorage.getItem('user');
      
      user = JSON.parse(user);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('WaitlistToken');
      deleteUserData(user.id);
      dispatch({
        type: LOGOUT,
        payload: {
          id: null,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const NavigateToCreate = () => {
  
  return dispatch => {
    dispatch({
      type: OPEN_CREATE_POST_NAV,
      payload: {
        create: true,
      },
    });
  };
};

export const NaviagteOutOfCreate = () => {
  
  return dispatch => {
    dispatch({
      type: CLOSE_CREATE_POST_NAV,
      payload: {
        create: false,
      },
    });
  };
};

export const getPosts = () => {
  return async dispatch => {
    dispatch({
      type: GET_POSTS_LOADING,
      payload: {
        loading: true,
      },
    });
    try {
      const posts = await getPostsFromFireStore();
      if (posts !== null) {
        dispatch({
          type: GET_POSTS,

          payload: {
            posts: posts,
            loading: false,
          },
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_POSTS_ERROR,
        payload: {
          error: err,
          loading: false,
        },
      });
    }
  };
};

export const createPosts = postObject => {
  return async dispatch => {
    dispatch({
      type: CREATE_POST_LOADING,
      payload: {
        loading: true,
      },
    });
    try {
      const ref = await sendPostToFireStore(postObject);
      if (ref !== null) {
        dispatch({
          type: CREATE_POST,
          payload: {
            ref: ref,
            loading: false,
          },
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: CREATE_POST_ERROR,
        payload: {
          error: err,
          loading: false,
        },
      });
    }
  };
};
