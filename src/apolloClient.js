import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-fetch";

import { hasWindow } from "./utils";

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: hasWindow()
    ? `http://${window.location.hostname}:4000`
    : "http://localhost:4000",
  fetch
});

export default new ApolloClient({
  cache,
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first"
    }
  }
});
