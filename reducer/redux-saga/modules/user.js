export const constants = {

    CREATE_USER: 'CREATE_USER',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILURE: 'CREATE_USER_FAILURE',

    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILURE: 'USER_LOGIN_FAILURE',
  
    CLEAR_MESSAGE: "CLEAR_MESSAGE"
  };
  
  export const actions = {

    createUser: (params) => {
      return {
        type: constants.CREATE_USER,
        payload: params,
      };
    },

    createUserSuccess: (response) => {
      return {
        type: constants.CREATE_USER_SUCCESS,
        payload: response,
      };
    },

    createUserFailure: (response) => {
      return {
        type: constants.CREATE_USER_FAILURE,
        payload: response,
      };
    },

    userLogin: (params) => {
      console.log('user calling')
      return {
        type: constants.USER_LOGIN,
        payload: params,
      };
    },

    userLoginSuccess: (response) => {
      return {
        type: constants.USER_LOGIN_SUCCESS,
        payload: response,
      };
    },

    userLoginFailure: (response) => {
      return {
        type: constants.USER_LOGIN_FAILURE,
        payload: response,
      };
    },

    clearMessage: () => {
      return {
        type: constants.CLEAR_MESSAGE,
        payload: null
      }
    }
  };
  
  export const initialState = {
    user_details: null,
    isLoading: false,
    userRegisterMessage: null,
    userLoginMessage: null,
  };
  
  export const userReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case constants.CLEAR_MESSAGE:
        return {
          ...state,
          userRegisterMessage: null,
          userLoginMessage: null
        }
      case constants.CREATE_USER:
        return {
          ...state,
          isLoading: true,
        };
      case constants.CREATE_USER_SUCCESS:
        return {
          ...state,
          userRegisterMessage: action.payload.data.message,
          isLoading: false,
        };
      case constants.CREATE_USER_FAILURE:
        return {
          ...state,
          isLoading: false,
        };
      case constants.USER_LOGIN:
        return {
          ...state,
          isLoading: true,
        };
      case constants.USER_LOGIN_SUCCESS:
        return {
          ...state,
          user_details: action.payload.data.data,
          userLoginMessage: action.payload.data.message,
          isLoading: false,
        };
      case constants.USER_LOGIN_FAILURE:
        console.log('login failure',action.payload.data)
        return {
          ...state,
          userLoginMessage: action.payload.data.message,
          isLoading: false,
        };
      default:
        return state;
    }
  };
  
  export default actions;
  