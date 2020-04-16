import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { createClientStore, createServerStore } from "../app/store";
import { PersistGate } from "redux-persist/integration/react";
import { IntlProvider } from "react-intl";
import { hasWindow } from "../app/utils";
import { CssBaseline } from "@material-ui/core";
import withApollo from "../hocs/withApollo";

const isClient = hasWindow();

if (isClient && process.env.NODE_ENV === "development") {
  console.log(1);
  const { registerObserver } = require("react-perf-devtool");
  registerObserver();
}

const { store, persistor } = isClient
  ? createClientStore()
  : createServerStore();

const theme = {
  rightDrawerWidth: 650,
  containerWidth: 500,
  leftDrawerWidth: 200
};

export default class extends App {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
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
