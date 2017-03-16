/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout';

import styles from './styles.css';

import selectAppGlobalState from './selectors';

import * as actions from './actions';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    notifications: PropTypes.object,
    children: PropTypes.node,

    initNotificationListener: PropTypes.func,
    notificationControlOpen: PropTypes.func,
    notificationControlClose: PropTypes.func,
  };

  componentDidMount() {
    this.props.initNotificationListener();
  }

  render() {
    const { notifications, notificationControlOpen, notificationControlClose } = this.props;

    return (
      <div className={styles.container}>
        <Header
          notifications={notifications}

          notificationControlOpen={notificationControlOpen}
          notificationControlClose={notificationControlClose}
        />

        <Layout>
          {React.Children.toArray(this.props.children)}
        </Layout>

        <Footer />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actions, dispatch),
  };
}

const mapStateToProps = selectAppGlobalState();

export default connect(mapStateToProps, mapDispatchToProps)(App);
