import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';

import { createClient, dedupExchange, fetchExchange, Provider, subscriptionExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { SubscriptionClient } from "subscriptions-transport-ws";

import App from './App';
import { GlobalStyles } from './layout/GlobalStyles';
import { getToken, setToken } from './utils/auth';
import { ME_QUERY } from './modules/auth/meQuery';
import { THREAD_FRAGMENT } from './modules/threads/fragments';

const subscriptionClient = new SubscriptionClient(
  'wss://threed-test-api.herokuapp.com/subscriptions',
  {
    reconnect: true,
    connectionParams: {
      authToken: getToken()
    }
  }
);

const THREADS_QUERY = gql`
  query($sortBy: SortBy!) {
    threads(sortBy: $sortBy, limit: null, skip: null) {
      ...ThreadFragment
    }
  }

  ${THREAD_FRAGMENT}
`;

const cache = cacheExchange({
  optimistic: {
    likeReply: (args, cache) => {
      const me = cache.readQuery({ query: ME_QUERY });
      if (me && me.me !== null) {
        return {
          __typename: 'Reply',
          id: args.replyId,
          likesNumber: cache.resolve({ __typename: 'Reply', id: args.replyId }, 'likesNumber')
            + 1,
        };
      } else {
        return null;
      }
    },
    likeThread: (args, cache) => {
      const me = cache.readQuery({ query: ME_QUERY });
      if (me && me.me !== null) {
        return {
          __typename: 'Thread',
          id: args.threadId,
          likesNumber: cache.resolve({ __typename: 'Thread', id: args.threadId }, 'likesNumber')
            + 1,
        };
      } else {
        return null;
      }
    },
  },
  updates: {
    Mutation: {
      signin: (result, _args, cache) => {
        if (result.signin) {
          setToken(result.signin.token);
          cache.updateQuery({ query: ME_QUERY }, () => ({ me: result.signin.user }));
        }
      },
      signup: (result, _args, cache) => {
        if (result.signup) {
          setToken(result.signup.token);
          cache.updateQuery({ query: ME_QUERY }, () => ({ me: result.signup.user }));
        }
      },
      createThread: (result, _args, cache) => {
        cache.updateQuery(
          { query: THREADS_QUERY, variables: { sortBy: 'LATEST' } },
          data => {
            if (data) {
              const newThread = result.createThread;
              const hasThread = data.threads.some(x => x && x.id === newThread.id);
              if (!hasThread) data.threads.unshift(newThread);
            }

            return data;
          }
        );
      },
      reply: (result, args, cache) => {
        const fragment = gql`fragment _ on Thread { id, repliesNumber, replies { id } }`;
        const data = cache.readFragment(fragment, { id: args.threadId });
        if (data) {
          const newReply = result.reply;
          const hasReply = data.replies.some(x => x && x.id === newReply.id);
          if (!hasReply) {
            data.replies.unshift(newReply);
            data.repliesNumber++;
            cache.writeFragment(fragment, data);
          }
        }
      }
    },
    Subscription: {
      newThread: (result, _args, cache) => {
        cache.updateQuery(
          { query: THREADS_QUERY, variables: { sortBy: 'LATEST' } },
          data => {
            if (data) {
              const newThread = result.newThread;
              const hasThread = data.threads.some(x => x && x.id === newThread.id);
              if (!hasThread) data.threads.unshift(newThread);
            }

            return data;
          }
        );
      },
      newReply: (result, { threadId: id }, cache) => {
        const numberFrag = gql`fragment _ on Thread { id, repliesNumber }`;
        const numberData = cache.readFragment(numberFrag, { id });
        if (numberData) {
          numberData.repliesNumber++;
          cache.writeFragment(numberFrag, numberData);
        }

        const repliesFrag = gql`fragment _ on Thread { id, replies { id } }`;
        const repliesData = cache.readFragment(repliesFrag, { id });
        if (repliesData) {
          const newReply = result.newReply;
          const hasReply = repliesData.replies.some(x => x && x.id === newReply.id);
          if (!hasReply) {
            repliesData.replies.unshift(newReply);
            cache.writeFragment(repliesData, repliesData);
          } else if (numberData) {
            numberData.repliesNumber--;
            cache.writeFragment(numberFrag, numberData);
          }
        }
      },
      newThreadLike: (result, args, cache) => {
        const fragment = gql`fragment _ on Thread { id, likesNumber }`;
        const data = cache.readFragment(fragment, { id: args.threadId });
        if (data) {
          data.likesNumber++;
          cache.writeFragment(fragment, data);
        }
      },
      newReplyLike: (result, args, cache) => {
        const fragment = gql`fragment _ on Reply { id, likesNumber }`;
        const data = cache.readFragment(fragment, { id: args.replyId });
        if (data) {
          data.likesNumber++;
          cache.writeFragment(fragment, data);
        }
      }
    }
  }
});

const client = createClient({
  url: 'https://threed-test-api.herokuapp.com/graphql',
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
  }
});

ReactDOM.render(
  <Provider value={client}>
    <GlobalStyles />
    <App />
  </Provider>,
  document.getElementById("root")
);
