/**
*
* Layout
*
*/

import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './styles.css';

function Layout(props) {
  const { className, children } = props;

  return (
    <div className={classnames(styles.layout, className)}>
      {children}
    </div>
  );
}

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Layout;
