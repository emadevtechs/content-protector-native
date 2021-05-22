import {
    all,
    fork,
    race,
    call,
    put,
    takeLatest,
    select,
  } from 'redux-saga/effects';
  import * as User from '../modules/user';
  import {
    createNewUser, userLoginUtils
  } from '../../Utils/User';
  
  
  export function* createUserSaga(action) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(createNewUser, params),
      });
      if (response && response.message === "Create User Successfully") {
        yield put(
          User.actions.createUserSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          User.actions.createUserFailure({data: {message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        User.actions.createUserFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* userLoginSaga(action) {
    const params = action.payload;
    console.log('........ saga calling')
    try {
      const {response} = yield race({
        response: call(userLoginUtils, params),
      });
      if (response && response.message === "User login Successfully") {
        yield put(
          User.actions.userLoginSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          User.actions.userLoginFailure({data: {message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        User.actions.userLoginFailure({message: 'Fetch failure'}),
      );
    }
  }
  
  export function* watchcreateUser() {
    yield takeLatest(
      User.constants.CREATE_USER,
      createUserSaga,
    );
  }

  export function* watchuserLogin() {
    yield takeLatest(
      User.constants.USER_LOGIN,
      userLoginSaga,
    );
  }
  
  export default function* root() {
    yield all([
      fork(watchcreateUser),
      fork(watchuserLogin),
    ]);
  }
  