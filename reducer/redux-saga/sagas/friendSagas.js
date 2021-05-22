import {
    all,
    fork,
    race,
    call,
    put,
    takeLatest,
    select,
  } from 'redux-saga/effects';
  import * as Friend from '../modules/friends';
  import {
    getUsersList, findIsmyFrnd, setAddFrndUtils, setUnFrndUtils,getMyFrndsList
  } from '../../Utils/Friend';
  
  
  export function* getUsersListSaga(action) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(getUsersList, params),
      });
      if (response && response.message === "Get Users Successfully") {
        yield put(
          Friend.actions.getUsersListSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Friend.actions.getUsersListFailure({data:{message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        Friend.actions.getUsersListFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* findIsMyFrnd(action) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(findIsmyFrnd, params),
      });
      if (response && response.message === "Find Friend Successfully") {
        yield put(
          Friend.actions.findIsFriendSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Friend.actions.findIsFriendFailure({data:{message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        Friend.actions.findIsFriendFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* setAddFriend(action) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(setAddFrndUtils, params),
      });
      if (response) {
        yield put(
          Friend.actions.setAddFriendSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Friend.actions.setAddFriendFailure({data:{message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        Friend.actions.setAddFriendFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* setUnFriend(action) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(setUnFrndUtils, params),
      });
      if (response && response.message === " Get Friends Successfully") {
        yield put(
          Friend.actions.setUnFriendSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Friend.actions.setUnFriendFailure({data:{message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        Friend.actions.setUnFriendFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* getMyFrndsListSaga(action) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(getMyFrndsList, params),
      });
      if (response) {
        yield put(
          Friend.actions.getMyFrndsListSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Friend.actions.getMyFrndsListFailure({data:{message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        Friend.actions.getMyFrndsListFailure({message: 'Fetch failure'}),
      );
    }
  }
  export function* watchgetUsersList() {
    yield takeLatest(
        Friend.constants.GET_USERS_LIST,
      getUsersListSaga,
    );
  }

  export function* watchgetIsFrnd() {
    yield takeLatest(
      Friend.constants.FIND_IS_FRIEND,
      findIsMyFrnd,
    );
  }

  export function* watchsetAddFrnd() {
    yield takeLatest(
        Friend.constants.SET_ADDFRND,
        setAddFriend,
    );
  }

  export function* watchsetUnFrnd() {
    yield takeLatest(
      Friend.constants.SET_UNFRND,
      setUnFriend,
    );
  }

  export function* watchgetMyFrndsList() {
    yield takeLatest(
      Friend.constants.GET_MY_FRNDS_LIST,
      getMyFrndsListSaga,
    );
  }

  export default function* root() {
    yield all([
      fork(watchgetUsersList),
      fork(watchsetAddFrnd),
      fork(watchsetUnFrnd),
      fork(watchgetIsFrnd),
      fork(watchgetMyFrndsList),
    ]);
  }
  