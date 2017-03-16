/**
*
* NotificationControl
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage, FormattedRelative } from 'react-intl';
import messages from './messages';

import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover/Popover';

import styles from './styles.css';

import {
  NOTIFICATIONS_MAX_COUNT_TO_DISPLAY_IN_BADGE as MAX_COUNT_TO_DISPLAY_IN_BADGE,
} from '../../config';

export class NotificationControl extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.handleControlClick = this.handleControlClick.bind(this);
  }

  handleControlClick(event) {
    const { notificationControlOpen } = this.props;

    event.preventDefault();

    this.control = event.target;
    notificationControlOpen();
  }

  /**
   * Render of counter badge
   */
  renderCounter() {
    const { notifications } = this.props;
    const count = notifications.get('unreadMessagesCount');

    if (!count) {
      return null;
    }

    return (
      <div className={styles.counter}>
        {count > MAX_COUNT_TO_DISPLAY_IN_BADGE ? (
          <FormattedMessage {...messages.maxCountIsReached} values={{ maxCount: MAX_COUNT_TO_DISPLAY_IN_BADGE }} />
        ) : count}
      </div>
    );
  }

  /**
   * Render of Popover
   */
  renderPopover() {
    const { notifications, notificationControlClose } = this.props;
    const isControlOpen = notifications.get('isControlOpen');

    return (
      <Popover
        open={isControlOpen}
        anchorEl={this.control}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        targetOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        animation={PopoverAnimationVertical}
        className={styles.popover}

        onRequestClose={notificationControlClose}
      >
        <div className={styles.popoverContent}>
          {this.renderPopoverContent()}

          <div>
            <a className={styles.showAllLink} onClick={notificationControlClose}>
              <FormattedMessage {...messages.showAllMessages} />
            </a>
          </div>
        </div>
      </Popover>
    );
  }

  /**
   * Render of Popover content
   */
  renderPopoverContent() {
    const { notifications } = this.props;
    const messagesData = notifications.get('messages');

    if (messagesData.isEmpty()) {
      return (
        <div className={styles.noMessages}>
          <FormattedMessage {...messages.noMessages} />
        </div>
      );
    }

    return (
      <ul className={styles.messages}>
        {messagesData.map((message) => (
          <li key={message.id} className={styles.message}>
            <a>
              {message.title}
            </a>
            <time className={styles.datetime}>
              <FormattedRelative value={message.datetime} />
            </time>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className={styles.notificationControl}>
        {this.renderCounter()}

        <IconButton onTouchTap={this.handleControlClick}>
          <NotificationsIcon color="#fff" />
        </IconButton>

        {this.renderPopover()}
      </div>
    );
  }
}

NotificationControl.propTypes = {
  notifications: PropTypes.object,

  notificationControlOpen: PropTypes.func,
  notificationControlClose: PropTypes.func,
};

NotificationControl.defaultProps = {
  notifications: [],
};

export default NotificationControl;
