import { useSubscription } from '@urql/preact';

export const useNewReplies = id => {
  return useSubscription({
    query: NEW_REPLIES_SUBSCRIPTION,
    variables: { id }
  });
};

const NEW_REPLIES_SUBSCRIPTION = `
  subscription($id: ID!) {
    newReply (threadId: $id) {
      id
      text
      createdBy {
        id
        username
      }
      createdAt
      likesNumber
    }
  }
`;
