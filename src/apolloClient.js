import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-fetch";

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: "http://localhost:3001/graphql",
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
