import { useSubscription } from 'urql';

export const useNewLikes = id => {
  return useSubscription({ query: NEW_LIKES_SUBSCRIPTION, variables: { id } });
};

const NEW_LIKES_SUBSCRIPTION = `
  subscription($id: ID!) {
    newThreadLike (threadId: $id) {
      id
      createdBy {
        id
        username
      }
      createdAt
    }
  }
`;
