import React from 'react';
import gql from 'graphql-tag';
import { THREAD_FRAGMENT } from '../fragments';
import { useQuery } from 'urql';

const ThreadDetail = ({ threadId }) => {
  useQuery({ query: THREAD_QUERY, variables: { id: threadId } })
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
