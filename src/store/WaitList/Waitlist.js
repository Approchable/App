import AsyncStorage from '@react-native-async-storage/async-storage';
// Token
const WAITLISTTOKEN = '0123456789';

//Action Types
const CHECK_WAITLIST = 'CHECK_WAITLIST';
const ADD_TO_WAITLIST = 'ADD_TO_WAITLIST';
const REMOVE_FROM_WAITLIST = 'REMOVE_FROM_WAITLIST';
const CLEAR_WAITLIST = 'CLEAR_WAITLIST';

//Action Creators

export const verifyToken = incomingToken => {
  return async dispatch => {
    const correctToken = WAITLISTTOKEN === incomingToken;
    if (correctToken) { AsyncStorage.setItem('WaitlistToken', incomingToken);}
    
    dispatch({
      type: CHECK_WAITLIST,
      payload: {
        token: WAITLISTTOKEN,
        isCorrectToken: correctToken,
      },
    });
  };
};

// reducers

const initialState = {
  token: null,
  isCorrectToken: false,
};

export default function WaitlistReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_WAITLIST:
      return {
        ...state,
        token: action.payload.token,
        isCorrectToken: action.payload.isCorrectToken,
      };
    case ADD_TO_WAITLIST:
      return {
        ...state,
        token: action.payload.token,
        isCorrectToken: action.payload.isCorrectToken,
      };
    case REMOVE_FROM_WAITLIST:
      return {
        ...state,
        token: action.payload.token,
        isCorrectToken: action.payload.isCorrectToken,
      };
    case CLEAR_WAITLIST:
      return {
        ...state,
        token: action.payload.token,
        isCorrectToken: action.payload.isCorrectToken,
      };
    default:
      return state;
  }
}
