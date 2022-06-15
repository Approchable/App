import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteUserData, writeUserData } from '../..//../firebase'

// actions types

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOGIN_LOADING = 'LOGIN_LOADING'

//actions
export const Init = () => {
  console.log('Initing user....')
  return async (dispatch) => {
    try {
      var data = await AsyncStorage.getItem('user')
      data = JSON.parse(data)
      console.log('user found', data)
      if (data === null || data === undefined) {
        dispatch({
          type: LOGIN,
          payload: {
            id: null,
          },
        })
      }
      if (data !== null || data !== undefined) {
        dispatch({
          type: LOGIN,
          payload: {
            id: data.id,
          },
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const login = (data) => {
  console.log('Logging in user....')
  return async (dispatch) => {
    try {
      console.log('Storing user information in async storage...')
      await AsyncStorage.setItem('user', JSON.stringify(data))

      console.log('adding user information in realtime database...')
      await writeUserData(data.id, data)
      dispatch({
        type: LOGIN,
        payload: {
          id: data.id,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      var user = await AsyncStorage.getItem('user')
      user = JSON.parse(user)
      await AsyncStorage.removeItem('user')
      await AsyncStorage.removeItem('WaitlistToken')
      deleteUserData(user.id)
      dispatch({
        type: LOGOUT,
        payload: {
          id: null,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }
}

//reducers

const authInitialState = {
  userId: undefined,
}
export function AuthReducer(state = authInitialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload.id,
      }
    case LOGOUT:
      return {
        ...state,
        userId: null,
      }

    default:
      return state
  }
}
