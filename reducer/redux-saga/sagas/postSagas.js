import {
    all,
    fork,
    race,
    call,
    put,
    takeLatest,
    select,
  } from 'redux-saga/effects';
  import * as Post from '../modules/post';
  import {
    getMyPosts, createNewPost
  } from '../../Utils/Post';
  
  
  export function* getMyPostSaga(action) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(getMyPosts, params),
      });
      if (response && response.message === "Get Posts Successfully") {
        yield put(
          Post.actions.getMyPostsSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Post.actions.getMyPostsFailure({message: response.message, data: null}),
        );
      }
    } catch (err) {
      yield put(
        Post.actions.getMyPostsFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* createMyPostSaga(action) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(createNewPost, params),
      });
      if (response && response.message === "Post create Successfully") {
        yield put(
          Post.actions.createMyPostSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Post.actions.createMyPostFailure({data:{message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        Post.actions.createMyPostFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* watchgetMyPost() {
    yield takeLatest(
        Post.constants.GET_MY_POSTS,
      getMyPostSaga,
    );
  }

  export function* watchcreateMyPost() {
    yield takeLatest(
        Post.constants.CREATE_MY_POST,
      createMyPostSaga,
    );
  }

  export default function* root() {
    yield all([
      fork(watchgetMyPost),
      fork(watchcreateMyPost),
    ]);
  }
  