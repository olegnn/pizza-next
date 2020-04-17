import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { IntlProvider } from 'react-intl';
import { CssBaseline } from '@material-ui/core';
import { hasWindow } from '../app/utils';
import { createClientStore, createServerStore } from '../app/store';

const isClient = hasWindow();

if (isClient && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const { registerObserver } = require('react-perf-devtool');
  registerObserver();
}

const { store, persistor } = isClient
  ? createClientStore()
  : createServerStore();

const theme = {
  rightDrawerWidth: 700,
  containerWidth: 500,
  leftDrawerWidth: 200
};

export default class extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <IntlProvider locale="en">
        <Provider store={store}>
          {isClient ? (
            <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </PersistGate>
          ) : (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          )}
        </Provider>
      </IntlProvider>
    );
  }
}
