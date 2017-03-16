/*
 * NotificationControl Messages
 *
 * This contains all the text for the NotificationControl component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  maxCountIsReached: {
    id: 'app.components.NotificationControl.maxCountIsReached',
    defaultMessage: '{maxCount, number}+',
  },
  noMessages: {
    id: 'app.components.NotificationControl.noMessages',
    defaultMessage: 'You have no messages.',
  },
  showAllMessages: {
    id: 'app.components.NotificationControl.showAllMessages',
    defaultMessage: 'Show all',
  },
});
