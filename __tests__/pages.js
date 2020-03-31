import React from "react";
import Desserts from "../pages/desserts";
import Pizza from "../pages/pizza";
import Soups from "../pages/soups";
import Drinks from "../pages/drinks";
import Index from "../pages";
import TestRenderer from "react-test-renderer";
import App from "../pages/_app";
import { IntlProvider } from "react-intl";
import { createServerStore } from "../app/store";
import { Provider } from "react-redux";

global.React = React;

describe("it takes all pages snapshots", () => {
  it("takes snapshots", () =>
    [Desserts, Pizza, Soups, Drinks, Index].forEach(Page => {
      expect(
        TestRenderer.create(
          <IntlProvider locale="en">
            <Provider store={createServerStore().store}>
              <Page />
            </Provider>
          </IntlProvider>
        )
      ).toMatchSnapshot();
    }));
});
