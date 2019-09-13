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
    likeReply: (args, cache) => {
      const likes = cache.getRecord(`Thread:${args.replyId}.likesNumber`);
      return {
        id: args.replyId,
        likesNumber: likes + 1,
        __typename: "Reply"
      };
    },
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
      //   const fragment = gql`
      //     fragment _thread on Thread {
      //       repliesNumber
      //       replies {
      //         id
      //       }
      //     }
      //   `;
      //   const readFragmentData = cache.readFragment(fragment, threadId);
      //   if (!readFragmentData.replies.find(({ id }) => id === result.reply.id)) {
      //     readFragmentData.replies.unshift(result.reply);
      //     readFragmentData.repliesNumber += 1;
      //     cache.writeFragment(fragment, readFragmentData)
      //   }
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
      newThreadLike: (result, { threadId }, cache) => {
        // TODO: update likesNumber (temp) and add to thread.likes[]
        // TODO: should also check if we already have it.
        //   const fragment = gql`
        //     fragment __thread on Thread {
        //       likesNumber
        //       likes {
        //         id
        //       }
        //     }
        //   `;
        //   const readFragmentData = cache.readFragment(fragment, threadId);
        //   if (!readFragmentData.likes.find(({ id }) => id === result.newThreadLike.id)) {
        //     readFragmentData.likes.unshift(result.newThreadLike);
        //     readFragmentData.likesNumber += 1;
        //     cache.writeFragment(fragment, readFragmentData)
        //   }
        // }
      },
      newReply: (result, args, cache) => {
        //   const fragment = gql`
        //     fragment _thread on Thread {
        //       repliesNumber
        //       replies {
        //         id
        //       }
        //     }
        //   `;
        //   const readFragmentData = cache.readFragment(fragment, threadId);
        //   if (!readFragmentData.replies.find(({ id }) => id === result.newReply.id)) {
        //     readFragmentData.replies.unshift(result.reply);
        //     readFragmentData.repliesNumber += 1;
        //     cache.writeFragment(fragment, readFragmentData)
        //   }
        // }
      },
      newReplyLike: (result, args, cache) => {
        //   const fragment = gql`
        //     fragment _reply on Reply {
        //       likesNumber
        //       likes {
        //         id
        //       }
        //     }
        //   `;
        //   const readFragmentData = cache.readFragment(fragment, threadId);
        //   if (!readFragmentData.likes.find(({ id }) => id === result.newReplyLike.id)) {
        //     readFragmentData.likes.unshift(result.reply);
        //     readFragmentData.likesNumber += 1;
        //     cache.writeFragment(fragment, readFragmentData)
        //   }
        // }
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
