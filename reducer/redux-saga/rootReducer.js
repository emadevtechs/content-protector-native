import { combineReducers } from 'redux';
import { userReducer as user } from './modules/user';
import {postReducer as post } from './modules/post';
import {friendReducer as friend } from './modules/friends';

export default combineReducers({
  user,
  post,
  friend
});
