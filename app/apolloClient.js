import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-fetch";

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: process.env.GRAPHQL_ENDPOINT,
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
