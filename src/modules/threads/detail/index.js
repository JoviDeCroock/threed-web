import React from 'react';
import gql from 'graphql-tag';
import { THREAD_FRAGMENT, REPLY_FRAGMENT } from '../fragments';
import { useQuery } from 'urql';
import styled from "styled-components";
import { useNewLikes, useNewReplies } from '../common';
import Reply from './reply';
import CreateReply from './reply/Create';

const ThreadDetail = ({ threadId }) => {
  const [{ fetching, data, error }] = useQuery({ query: THREAD_QUERY, variables: { id: threadId } });

  useNewLikes(threadId);
  useNewReplies(threadId);

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
      <CreateReply threadId={threadId} />
    </Wrapper>
  );
}

const THREAD_QUERY = gql`
  query($id: ID!) {
    thread(id: $id) {
      ...ThreadFragment
      replies {
        ...ReplyFragment
      }
    }
  }
  ${THREAD_FRAGMENT}
  ${REPLY_FRAGMENT}
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
