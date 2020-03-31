import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store, persistor } from "../app/store";
import apolloClient from "../app/apolloClient";
import { ApolloProvider } from "@apollo/react-hooks";
import { PersistGate } from "redux-persist/integration/react";
import { IntlProvider } from "react-intl";
import { CssBaseline } from "@material-ui/core";

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <IntlProvider locale="en">
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </IntlProvider>
    );
  }
}
