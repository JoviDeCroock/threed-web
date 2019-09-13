import React from 'react';
import { useSubscription } from 'urql';
import gql from 'graphql-tag';

const Reply = ({ title, text, id }) => {
  useSubscription({ query: NEW_REPLY_LIKE, variables: { id } });

  return (
    <div>
      <h6>{title}</h6>
      <p>{text}</p>
    </div>
  )
}

const NEW_REPLY_LIKE = gql`
  subscription ($id: ID!) {
    newReplyLike(replyId: $id) {
      id
      createdBy {
        id
        username
      }
      createdAt
    }
  }
`;

export default Reply;
