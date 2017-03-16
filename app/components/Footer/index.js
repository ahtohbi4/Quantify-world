/**
*
* Footer
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Layout from '../Layout';

import styles from './styles.css';

import { YEAR_OF_PROGECT_START } from '../../config';
const yearCurrent = (new Date()).getFullYear();

function Footer() {
  return (
    <footer className={styles.footer}>
      <Layout>
        {YEAR_OF_PROGECT_START === yearCurrent ? (
          <FormattedMessage
            {...messages.year}
            values={{
              yearStart: YEAR_OF_PROGECT_START,
            }}
          />
        ) : (
          <FormattedMessage
            {...messages.yearsRange}
            values={{
              yearStart: YEAR_OF_PROGECT_START,
              yearCurrent,
            }}
          />
        )}
      </Layout>
    </footer>
  );
}

export default Footer;
