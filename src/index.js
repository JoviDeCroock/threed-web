import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, dedupExchange, fetchExchange, Provider, subscriptionExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { SubscriptionClient } from "subscriptions-transport-ws";
import App from './App';
import { getToken, setToken } from './utils/auth';
import { ME_QUERY } from './modules/auth/meQuery';
import "./index.css";
import gql from 'graphql-tag';

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
      createThread: (result, _args, cache) => {
        console.log('creating thread', result);
        cache.updateQuery(
          {
            // TODO: this is temp because of a bug in graphcache convert back to fragment when new version is released
            query: gql`
              query($sortBy: SortBy!, $skip: Int, $limit: Int) {
                threads(sortBy: $sortBy, limit: $limit, skip: $skip) {
                  id
                  text
                  title
                  createdBy {
                    id
                    username
                  }
                  createdAt
                  likesNumber
                  repliesNumber
                }
              }
            `,
            variables: { sortBy: "LATEST" }
          },
          data => {
            // TODO: maybe a bit too naive, should we cut the last element out as well?
            data.threads.unshift(result.createThread);
            return data;
          }
        );
      },
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
