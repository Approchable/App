//const initialState  = {email: '', password: '', error: '', loading: false, user: null, token: null};
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
  CONNECTIONS_LOADING,
  GET_CONNECTIONS_BY_ID,
  GET_CONNECTIONS_BY_ID_ERROR,
  CONNECTIONS_USER_DETAILS,
  CONNECTIONS_USER_ERROR,
} from './actionTypes';

const authInitialState = {
  userId: undefined,
};
export function AuthReducer(state = authInitialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload.id,
      };
    case LOGOUT:
      return {
        ...state,
        userId: null,
      };

    default:
      return state;
  }
}

const navInitilaState = {
  create: false,
};

export function NavReducer(state = navInitilaState, action) {
  switch (action.type) {
    case OPEN_CREATE_POST_NAV:
      return {
        ...state,
        create: action.payload.create,
      };
    case CLOSE_CREATE_POST_NAV:
      return {
        ...state,
        create: action.payload.create,
      };
    default:
      return state;
  }
}


const createPostInitialState = {
  ref: null,
  loading: false,
};

export function CreatePostsReducer(state = createPostInitialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        ref: action.payload.ref,
        loading: action.payload.loading,
      };
    case CREATE_POST_LOADING:
      return {
        ...state,
        ref: action.payload.ref,
        loading: action.payload.loading,
      };
    case CREATE_POST_ERROR:
      return {
        ...state,
        ref: action.payload.ref,
        error: action.payload.error,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
}

const getConnectionsInitialState = {
  connections: null,
  loading: false,
};

export function GetConnectionsReducer(state = getConnectionsInitialState, action) {
  switch (action.type) {
    case GET_CONNECTIONS_BY_ID:
      return {
        ...state,
        connections: action.payload.connections,
        loading: action.payload.loading,
      };
    case CONNECTIONS_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case GET_CONNECTIONS_BY_ID_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
}

const connectedUserState = {
  connectedUser: undefined,
  error: ''
};
export function getConnectionUserReducer(state = connectedUserState, action) {
  switch (action.type) {

    case CONNECTIONS_USER_DETAILS:
      return {
        ...state,
        connectedUser: action.payload.userData,
      };
    case CONNECTIONS_USER_ERROR:
      return {
        ...state,
        error: action.payload.err,
      };

    default:
      return state;
  }
}

