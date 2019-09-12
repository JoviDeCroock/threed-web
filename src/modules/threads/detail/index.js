import React from 'react';
import gql from 'graphql-tag';
import { THREAD_FRAGMENT } from '../fragments';
import { useQuery } from 'urql';
import { useNewLikes, useNewReplies } from '../common';

const ThreadDetail = ({ threadId }) => {
  useQuery({ query: THREAD_QUERY, variables: { id: threadId } });
  useNewLikes(threadId);
  useNewReplies(threadId);

  return <div>detail</div>
}

const THREAD_QUERY = gql`
  query($id: ID!) {
    thread(id: $id) {
      ...ThreadFragment
    }
  }
  ${THREAD_FRAGMENT}
`;

export default ThreadDetail;
