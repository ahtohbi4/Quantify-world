import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { pushNotification } from './actions';

const PUSH_INTERVAL = 20000;

let id = 100;

import {
  INIT_NOTIFICATION_LISTENER,
} from './constants';

/**
 * Generates a fake message
 */
function generateFakeMessage() {
  const ABC = 'abcdefghijklmnopqrstuvwxyz     '.split('');
  const MESSAGE_LENGTH_MIN = 40;
  const MESSAGE_LENGTH_MAX = 70;
  const messageLength = Math.floor(Math.random() * (MESSAGE_LENGTH_MAX - MESSAGE_LENGTH_MIN) + MESSAGE_LENGTH_MIN);
  let result = '';

  for (let i = 0; i < messageLength; i++) {
    const letter = ABC[Math.floor(Math.random() * ABC.length)];
    const prevLetter = result[result.length - 1];

    result += !prevLetter ? letter.toUpperCase() : letter;
  }

  return {
    id: id++,
    title: `${result.trim()}.`,
    unread: true,
    datetime: new Date(),
  };
}

/**
 * Utility to delay
 *
 * @param {Numbers} ms
 */
function delay(ms) {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });

  return promise;
}

export function* pushNotificationSaga() {
  yield call(delay, PUSH_INTERVAL);
  yield put(pushNotification(generateFakeMessage()));
}

export function* initNotificationListenerSaga() {
  while (true) {
    yield call(pushNotificationSaga);
  }
}

export function* initNotificationListenerWatcherSaga() {
  yield call(takeEvery, INIT_NOTIFICATION_LISTENER, initNotificationListenerSaga);
}

export default [
  initNotificationListenerWatcherSaga,
];
