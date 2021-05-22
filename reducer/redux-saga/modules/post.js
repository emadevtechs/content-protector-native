export const constants = {

    GET_MY_POSTS: 'GET_MY_POSTS',
    GET_MY_POSTS_SUCCESS: 'GET_MY_POSTS_SUCCESS',
    GET_MY_POSTS_FAILURE: 'GET_MY_POSTS_FAILURE',

    CREATE_MY_POST: 'CREATE_MY_POST',
    CREATE_MY_POST_SUCCESS: 'CREATE_MY_POST_SUCCESS',
    CREATE_MY_POST_FAILURE: 'CREATE_MY_POST_FAILURE',

  };
  
  export const actions = {

    getMyPosts: (params) => {
      console.log('GET_MY_POSTS',params)
      return {
        type: constants.GET_MY_POSTS,
        payload: params,
      };
    },

    getMyPostsSuccess: (response) => {
      return {
        type: constants.GET_MY_POSTS_SUCCESS,
        payload: response,
      };
    },

    getMyPostsFailure: (response) => {
      return {
        type: constants.GET_MY_POSTS_FAILURE,
        payload: response,
      };
    },

    createMyPost: (params) => {
      return {
        type: constants.CREATE_MY_POST,
        payload: params,
      };
    },

    createMyPostSuccess: (response) => {
      return {
        type: constants.CREATE_MY_POST_SUCCESS,
        payload: response,
      };
    },

    createMyPostFailure: (response) => {
      return {
        type: constants.CREATE_MY_POST_FAILURE,
        payload: response,
      };
    },

  };
  
  export const initialState = {
    my_posts: null,
    isLoading: false,
    getPostMessage: null,
  };
  
  export const postReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case constants.GET_MY_POSTS:
        return {
          ...state,
          isLoading: true,
        };
      case constants.GET_MY_POSTS_SUCCESS:
        return {
          ...state,
          getPostMessage: action.payload.data.message,
          my_posts: action.payload.data.data,
          isLoading: false,
        };
      case constants.GET_MY_POSTS_FAILURE:
        return {
          ...state,
          isLoading: false,
        };
      default:
        return state;
    }
  };
  
  export default actions;
  