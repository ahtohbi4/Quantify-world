import {
  INIT_NOTIFICATION_LISTENER,
  PUSH_NOTIFICATION,

  NOTIFICATION_CONTROL_OPEN,
  NOTIFICATION_CONTROL_CLOSE,
} from './constants';

export function initNotificationListener() {
  return {
    type: INIT_NOTIFICATION_LISTENER,
  };
}

export function pushNotification(notification) {
  return {
    type: PUSH_NOTIFICATION,
    payload: notification,
  };
}

export function notificationControlOpen() {
  return {
    type: NOTIFICATION_CONTROL_OPEN,
  };
}

export function notificationControlClose() {
  return {
    type: NOTIFICATION_CONTROL_CLOSE,
  };
}
