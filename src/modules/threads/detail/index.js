import React from 'react';
import gql from 'graphql-tag';
import { THREAD_FRAGMENT } from '../fragments';
import { useQuery } from 'urql';
import styled from "styled-components";
import { useNewLikes, useNewReplies } from '../common';
import Reply from './reply';

const ThreadDetail = ({ threadId }) => {
  const [{ fetching, data, error }] = useQuery({ query: THREAD_QUERY, variables: { id: threadId } });
  useNewLikes(threadId);
  useNewReplies(threadId);

  console.log(data, fetching, error);
  if (fetching || error) return <p>Loading...</p>

  return (
    <Wrapper>
      <HeaderContainer>
        <h3>{data.thread.title}</h3>
        <p>{data.thread.text}</p>
      </HeaderContainer>
      <Replies>
        {data.thread.replies.map(reply => (
          <Reply key={reply.id} {...reply} />
        ))}
      </Replies>
    </Wrapper>
  );
}

const THREAD_QUERY = gql`
  query($id: ID!) {
    thread(id: $id) {
      ...ThreadFragment
      replies {
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
  }
  ${THREAD_FRAGMENT}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  background: white;
  border: 1px solid black;
`;

const Replies = styled.div`

`;

export default ThreadDetail;
