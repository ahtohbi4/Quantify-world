import { fromJS, List } from 'immutable';
import {
  INIT_NOTIFICATION_LISTENER,
  PUSH_NOTIFICATION,

  NOTIFICATION_CONTROL_OPEN,
  NOTIFICATION_CONTROL_CLOSE,
} from './constants';

import {
  NOTIFICATIONS_MAX_COUNT_TO_DISPLAY,
} from '../../config';

const initialState = fromJS({
  notifications: {
    isControlOpen: false,
    messages: [],
    unreadMessagesCount: 0,
  },
});

const fakeData = [
  {
    id: 17,
    title: 'Test test test 17',
    unread: true,
    datetime: new Date(),
  },
  {
    id: 16,
    title: 'Test test test 16',
    unread: true,
    datetime: new Date().setHours((new Date()).getHours() - 2),
  },
  {
    id: 14,
    title: 'Test test test 14',
    unread: true,
    datetime: new Date().setDate((new Date()).getDate() - 1),
  },
  {
    id: 13,
    title: 'Test test test 13',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 3),
  },
  {
    id: 12,
    title: 'Test test test 12',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 8),
  },
  {
    id: 11,
    title: 'Test test test 11',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 31),
  },
  {
    id: 10,
    title: 'Test test test 10',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 160),
  },
];

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_NOTIFICATION_LISTENER:
      return state.update('notifications', (subState) => subState
        .set('unreadMessagesCount', fakeData
          .filter(({ unread }) => unread)
          .length
        )
        .set('messages', new List(fakeData.slice(0, NOTIFICATIONS_MAX_COUNT_TO_DISPLAY)))
      );

    case PUSH_NOTIFICATION:
      return state.update('notifications', (subState) => subState
        .update('messages', (messages) => {
          const result = messages.unshift(action.payload);

          if (result.count() > NOTIFICATIONS_MAX_COUNT_TO_DISPLAY) {
            return result.pop();
          }

          return result;
        })
        .update('unreadMessagesCount', (count) => subState.get('isControlOpen') ? count : count + 1)
      );

    case NOTIFICATION_CONTROL_OPEN:
      return state.update('notifications', (subState) => subState
        .set('isControlOpen', true)
        .set('unreadMessagesCount', 0)
      );

    case NOTIFICATION_CONTROL_CLOSE:
      return state.setIn(['notifications', 'isControlOpen'], false);

    default:
      return state;
  }
}

export default notificationReducer;
