import {
  gql,
  createClient,
  dedupExchange,
  fetchExchange
} from '@urql/preact';

import { persistedFetchExchange } from "@urql/exchange-persisted-fetch";
import { offlineExchange } from "@urql/exchange-graphcache";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";

import { getToken, setToken } from "./utils/auth";
import { ME_QUERY } from "./modules/auth/meQuery";
import { THREAD_FRAGMENT } from "./modules/threads/fragments";
import schema from './schema';

const THREADS_QUERY = gql`
  query($sortBy: SortBy!) {
    threads(sortBy: $sortBy, limit: null, skip: null) {
      ...ThreadFragment
    }
  }

  ${THREAD_FRAGMENT}
`;

const cache = offlineExchange({
  schema,
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
  },
  resolvers: {
    Query: {
      thread: (_, args) => {
        return { __typename: 'Thread', id: args.id };
      }
    }
  },
});

export const client = createClient({
  url: "https://threed-test-api.herokuapp.com/graphql",
  exchanges: [
    dedupExchange,
    cache,
    persistedFetchExchange(),
    fetchExchange,
  ],
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" }
    };
  }
});
