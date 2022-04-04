import {
  LOGIN,
  LOGOUT,
  OPEN_CREATE_POST_NAV,
  CLOSE_CREATE_POST_NAV,
} from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteUserData } from '../../firebase';
export const Init = () => {
  console.log('Initing user....');
  return async dispatch => {
    try {
      var data = await AsyncStorage.getItem('user');
      data = JSON.parse(data);
      console.log('user found', data);
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
  console.log('navigating to create');
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
