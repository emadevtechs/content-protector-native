export const constants = {

    GET_USERS_LIST: 'GET_USERS_LIST',
    GET_USERS_LIST_SUCCESS: 'GET_USERS_LIST_SUCCESS',
    GET_USERS_LIST_FAILURE: 'GET_USERS_LIST_FAILURE',

    GET_MY_FRNDS_LIST: 'GET_MY_FRNDS_LIST',
    GET_MY_FRNDS_LIST_SUCCESS: 'GET_MY_FRNDS_LIST_SUCCESS',
    GET_MY_FRNDS_LIST_FAILURE: 'GET_MY_FRNDS_LIST_FAILURE',

    CREATE_MY_POST: 'CREATE_MY_POST',
    CREATE_MY_POST_SUCCESS: 'CREATE_MY_POST_SUCCESS',
    CREATE_MY_POST_FAILURE: 'CREATE_MY_POST_FAILURE',

    FIND_IS_FRIEND: 'FIND_IS_FRIEND',
    FIND_IS_FRIEND_SUCCESS: 'FIND_IS_FRIEND_SUCCESS',
    FIND_IS_FRIEND_FAILURE: 'FIND_IS_FRIEND_FAILURE',

    SET_UNFRND: 'SET_UNFRND',
    SET_UNFRND_SUCCESS: 'SET_UNFRND_SUCCESS',
    SET_UNFRND_FAILURE: 'SET_UNFRND_FAILURE',

    SET_ADDFRND: 'SET_ADDFRND',
    SET_ADDFRND_SUCCESS: 'SET_ADDFRND_SUCCESS',
    SET_ADDFRND_FAILURE: 'SET_ADDFRND_FAILURE',

  };
  
  export const actions = {

    getUsersList: (params) => {
      console.log('GET_USERS_LIST',params)
      return {
        type: constants.GET_USERS_LIST,
        payload: params,
      };
    },

    getUsersListSuccess: (response) => {
      return {
        type: constants.GET_USERS_LIST_SUCCESS,
        payload: response,
      };
    },

    getUsersListFailure: (response) => {
      return {
        type: constants.GET_USERS_LIST_FAILURE,
        payload: response,
      };
    },

    getMyFrndsList: (params) => {
      return {
        type: constants.GET_MY_FRNDS_LIST,
        payload: params,
      };
    },

    getMyFrndsListSuccess: (response) => {
      return {
        type: constants.GET_MY_FRNDS_LIST_SUCCESS,
        payload: response,
      };
    },

    getMyFrndsListFailure: (response) => {
      return {
        type: constants.GET_MY_FRNDS_LIST_FAILURE,
        payload: response,
      };
    },

    findIsFriend: (params) => {
      return {
        type: constants.FIND_IS_FRIEND,
        payload: params,
      };
    },

    findIsFriendSuccess: (response) => {
      return {
        type: constants.FIND_IS_FRIEND_SUCCESS,
        payload: response,
      };
    },

    findIsFriendFailure: (response) => {
      return {
        type: constants.FIND_IS_FRIEND_FAILURE,
        payload: response,
      };
    },

    setUnFriend: (params) => {
      return {
        type: constants.SET_UNFRND,
        payload: params,
      };
    },

    setUnFriendSuccess: (response) => {
      return {
        type: constants.SET_UNFRND_SUCCESS,
        payload: response,
      };
    },

    setUnFriendFailure: (response) => {
      return {
        type: constants.SET_UNFRND_FAILURE,
        payload: response,
      };
    },

    setAddFriend: (params) => {
      return {
        type: constants.SET_ADDFRND,
        payload: params,
      };
    },

    setAddFriendSuccess: (response) => {
      return {
        type: constants.SET_ADDFRND_SUCCESS,
        payload: response,
      };
    },

    setAddFriendFailure: (response) => {
      return {
        type: constants.SET_ADDFRND_FAILURE,
        payload: response,
      };
    },

  };
  
  export const initialState = {
    users_list: null,
    isLoading: false,
    getPostMessage: null,
    isFriend: false,
    isFrndLoading: false,
    my_frnds_list: null
  };
  
  export const friendReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case constants.GET_USERS_LIST:
        return {
          ...state,
          isLoading: true,
        };
      case constants.GET_USERS_LIST_SUCCESS:
        return {
          ...state,
          users_list: action.payload.data.data,
          isLoading: false,
        };
      case constants.GET_USERS_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
      case constants.GET_MY_FRNDS_LIST:
        return {
          ...state,
          isLoading: true,
        };
      case constants.GET_MY_FRNDS_LIST_SUCCESS:
        return {
          ...state,
          my_frnds_list: action.payload.data.data,
          isLoading: false,
        };
      case constants.GET_MY_FRNDS_LIST_FAILURE:
        return {
          ...state,
          isLoading: false,
        };
      case constants.FIND_IS_FRIEND:
        return {
          ...state,
          isFriend: false,
          isFrndLoading: true,
        };
      case constants.FIND_IS_FRIEND_SUCCESS:
        console.log('FIND_IS_FRIEND_SUCCESS')
        return {
          ...state,
          isFriend: action.payload.data.data,
          isFrndLoading: false,
        };
      case constants.FIND_IS_FRIEND_FAILURE:
        return {
          ...state,
          isFrndLoading: false,
          isFriend: false,
        };
      default:
        return state;
    }
  };
  
  export default actions;
  