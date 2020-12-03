import {
  gql,
  createClient,
  dedupExchange,
  fetchExchange
} from "urql";

import { persistedFetchExchange } from "@urql/exchange-persisted-fetch";
import { offlineExchange } from "@urql/exchange-graphcache";
import { makeDefaultStorage} from "@urql/exchange-graphcache/default-storage";
import { devtoolsExchange } from "@urql/devtools";

import { getToken, setToken } from "./utils/auth";
import { ME_QUERY } from "./modules/auth/meQuery";
import { THREAD_FRAGMENT } from "./modules/threads/fragments";
import schema from './schema.json';

const THREADS_QUERY = gql`
  query($sortBy: SortBy!) {
    threads(sortBy: $sortBy, limit: null, skip: null) {
      ...ThreadFragment
    }
  }

  ${THREAD_FRAGMENT}
`;

/*
const subscriptionClient = new SubscriptionClient(
  "wss://threed-test-api.herokuapp.com/subscriptions",
  {
    reconnect: true,
    connectionParams: {
      authToken: getToken()
    }
  }
);
*/

const cache = offlineExchange({
  storage: makeDefaultStorage(),
  optimistic: {
    likeReply: (args, cache) => {
      const id = args.replyId;
      const me = cache.readQuery({ query: ME_QUERY });
      const hasUserLiked = cache.resolve({ __typename: "Reply", id }, "hasUserLiked");

      if (me && me.me !== null && !hasUserLiked) {
        return {
          __typename: "Reply",
          id: args.replyId,
          hasUserLiked: true,
          likesNumber:
            cache.resolve(
              { __typename: "Reply", id },
              "likesNumber"
            ) + 1
        };
      } else {
        return null;
      }
    },
    likeThread: (args, cache) => {
      const id = args.threadId;
      const me = cache.readQuery({ query: ME_QUERY });
      const hasUserLiked = cache.resolve({ __typename: "Thread", id }, "hasUserLiked");

      if (me && me.me !== null && !hasUserLiked) {
        return {
          __typename: "Thread",
          id: args.threadId,
          hasUserLiked: true,
          likesNumber:
            cache.resolve(
              { __typename: "Thread", id: args.threadId },
              "likesNumber"
            ) + 1
        };
      } else {
        return null;
      }
    }
  },
  updates: {
    Mutation: {
      signin: (result, _args, cache) => {
        if (result.signin) {
          setToken(result.signin.token);
          cache.updateQuery({ query: ME_QUERY }, () => ({
            me: result.signin.user
          }));
        }
      },
      signup: (result, _args, cache) => {
        if (result.signup) {
          setToken(result.signup.token);
          cache.updateQuery({ query: ME_QUERY }, () => ({
            me: result.signup.user
          }));
        }
      },
      createThread: (result, _args, cache) => {
        cache.updateQuery(
          { query: THREADS_QUERY, variables: { sortBy: "LATEST" } },
          data => {
            if (data) {
              const newThread = result.createThread;
              const hasThread = data.threads.some(
                x => x && x.id === newThread.id
              );
              if (!hasThread) data.threads.unshift(newThread);
            }

            return data;
          }
        );
      },
      reply: (result, args, cache) => {
        const fragment = gql`
          fragment _ on Thread {
            id
            repliesNumber
            replies {
              id
            }
          }
        `;
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
          { query: THREADS_QUERY, variables: { sortBy: "LATEST" } },
          data => {
            if (data) {
              const newThread = result.newThread;
              const hasThread = data.threads.some(
                x => x && x.id === newThread.id
              );
              if (!hasThread) data.threads.unshift(newThread);
            }

            return data;
          }
        );
      },
      newReply: (result, { threadId: id }, cache) => {
        const numberFrag = gql`
          fragment _ on Thread {
            id
            repliesNumber
          }
        `;
        const numberData = cache.readFragment(numberFrag, { id });
        if (numberData) {
          numberData.repliesNumber++;
          cache.writeFragment(numberFrag, numberData);
        }

        const repliesFrag = gql`
          fragment _ on Thread {
            id
            replies {
              id
            }
          }
        `;
        const repliesData = cache.readFragment(repliesFrag, { id });
        if (repliesData) {
          const newReply = result.newReply;
          const hasReply = repliesData.replies.some(
            x => x && x.id === newReply.id
          );
          if (!hasReply) {
            repliesData.replies.unshift(newReply);
            cache.writeFragment(repliesFrag, repliesData);
          } else if (numberData) {
            numberData.repliesNumber--;
            cache.writeFragment(numberFrag, numberData);
          }
        }
      },
      newThreadLike: (result, args, cache) => {
        const me = cache.readQuery({ query: ME_QUERY });
        if (!me || me.id !== result.newThreadLike.createdBy.id) {
          const fragment = gql`
            fragment _ on Thread {
              id
              likesNumber
            }
          `;

          const data = cache.readFragment(fragment, { id: args.threadId });
          if (data) {
            data.likesNumber++;
            cache.writeFragment(fragment, data);
          }
        }
      },
      newReplyLike: (result, args, cache) => {
        const me = cache.readQuery({ query: ME_QUERY });
        if (!me || me.id !== result.newReplyLike.createdBy.id) {
          const fragment = gql`
            fragment _ on Reply {
              id
              likesNumber
            }
          `;

          const data = cache.readFragment(fragment, { id: args.replyId });
          if (data) {
            data.likesNumber++;
            cache.writeFragment(fragment, data);
          }
        }
      }
    }
  },
  resolvers: {
    Query: {
      thread: (_, args) => {
        return { __typename: 'Thread', id: args.id };
      }
    }
  },
  schema
});

export const client = createClient({
  url: "https://threed-test-api.herokuapp.com/graphql",
  exchanges: [
    dedupExchange,
    devtoolsExchange,
    cache,
    persistedFetchExchange(),
    fetchExchange,
    /*
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
    */
  ],
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" }
    };
  }
});
