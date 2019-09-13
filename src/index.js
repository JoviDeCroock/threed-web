import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, dedupExchange, fetchExchange, Provider, subscriptionExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { SubscriptionClient } from "subscriptions-transport-ws";
import App from './App';
import { getToken, setToken } from './utils/auth';
import { ME_QUERY } from './modules/auth/meQuery';
import gql from 'graphql-tag';
import { THREAD_FRAGMENT } from './modules/threads/fragments';
import { GlobalStyles } from './layout/GlobalStyles';

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

// TODO: this is temp because of a bug in graphcache convert back to fragment when new version is released
const listUpdateQuery = {
  query: gql`
    query($sortBy: SortBy!, $skip: Int, $limit: Int) {
      threads(sortBy: $sortBy, limit: $limit, skip: $skip) {
        ...ThreadFragment
      }
    }
    ${THREAD_FRAGMENT}
  `,
  variables: { sortBy: "LATEST" }
};

const cache = cacheExchange({
  optimistic: {
    likeThread: (args, cache) => {
      // TODO TEMPFIX:
      const likes = cache.getRecord(`Thread:${args.threadId}.likesNumber`);
      // GOOD ONE: needs release
      // const thread = cache.readQuery({
      //   query: gql`
      //     query ($id: ID!) {
      //       thread(id: $id) {
      //         id
      //         likesNumber
      //         __typename
      //       }
      //     }
      //   `
      // });
      // console.log(thread);
      return {
        id: args.threadId,
        likesNumber: likes + 1,
        __typename: 'Thread'
      }
    },
  },
  updates: {
    Mutation: {
      createThread: (result, _args, cache) => {
        cache.updateQuery(listUpdateQuery,
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
      },
      reply: (result, { threadId }, cache) => {
        // TODO: wait for writeFragment
      }
    },
    Subscription: {
      newThread: (result, args, cache) => {
        cache.updateQuery(listUpdateQuery,
          data => {
            if (data && data.threads && !data.threads.find(({ id }) => id === data.newThread.id)) {
              data.threads.unshift(result.newThread);
            }
            return data;
          })
      },
      newThreadLike: (result, args, cache) => {
        // TODO: update likesNumber (temp) and add to thread.likes[]
        // TODO: should also check if we already have it.
      },
      newReply: (result, args, cache) => {
        // TODO: update with new reply
        // TODO: should also check if we already have it.
      },
      newReplyLike: (result, args, cache) => {
        // TODO: update likesNumber (temp) and add to reply.likes[]
        // TODO: should also check if we already have it.
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
    <GlobalStyles />
    <App />
  </Provider>,
  document.getElementById("root")
);
