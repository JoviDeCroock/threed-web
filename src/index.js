import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, dedupExchange, fetchExchange, Provider, subscriptionExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { SubscriptionClient } from "subscriptions-transport-ws";
import App from './App';
import { getToken, setToken } from './utils/auth';
import { ME_QUERY } from './modules/auth/meQuery';
import "./index.css";

const updateAuth = (cache, { user, token }) => {
  setToken(token);
  cache.updateQuery({ query: ME_QUERY }, () => ({ me: user }));
}

const subscriptionClient = new SubscriptionClient("ws://localhost:3001/subscriptions", {
  reconnect: true,
  connectionParams: {
    authToken: getToken()
  }
});

const cache = cacheExchange({
  updates: {
    Mutation: {
      signin: (result, _args, cache) => {
        updateAuth(cache, result.signin);
      },
      signup: (result, _args, cache) => {
        updateAuth(cache, result.signup);
      }
    },
    Subscription: {
      newThreadLike: (result, args, cache) => {
        // TODO: update with new like
      },
      newReply: (result, args, cache) => {
        // TODO: update with new reply
      },
      newReplyLike: (result, args, cache) => {
        // TODO: update with new like
      }
    }
  }
});

const client = createClient({
  exchanges: [
    dedupExchange,
    cache,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ],
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" }
    };
  },
  url: "http://localhost:3001/graphql"
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);
