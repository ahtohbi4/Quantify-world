/**
*
* Header
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Layout from '../Layout';
import NotificationControl from '../NotificationControl';

import styles from './styles.css';

function Header(props) {
  const { notifications, notificationControlOpen, notificationControlClose } = props;

  return (
    <header className={styles.header}>
      <Layout className={styles.container}>
        <div className={styles.logo}>
          <FormattedMessage {...messages.header} />
        </div>

        <div className={styles.controls}>
          <NotificationControl
            notifications={notifications}

            notificationControlOpen={notificationControlOpen}
            notificationControlClose={notificationControlClose}
          />
        </div>
      </Layout>
    </header>
  );
}

Header.propTypes = {
  notifications: PropTypes.object,

  notificationControlOpen: PropTypes.func,
  notificationControlClose: PropTypes.func,
};

export default Header;
