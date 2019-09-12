import React from 'react';
import styled from 'styled-components';
import { useMutation, useSubscription } from 'urql';
import { timeDifferenceForDate } from '../../../utils/timeDiff';

const Thead = ({ title, text, createdBy, likesNumber, repliesNumber, id, createdAt }) => {
  const [result, like] = useMutation(LIKE_THREAD_MUTATION);
  useSubscription({ query: NEW_LIKES_SUBSCRIPTION, variables: { id } });
  useSubscription({ query: NEW_REPLIES_SUBSCRIPTION, variables: { id } })

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{text}</Content>
      <CreatedBy>
        Created by: {createdBy.username} - {timeDifferenceForDate(createdAt)}
      </CreatedBy>
      <TextGroup>
        <button disabled={result.fetching} onClick={() => like({ id })}>
          <span role="img" aria-label="Like thread">
            👍
          </span>
        </button>
        <Likes>{likesNumber} likes</Likes>
        <Replies>{repliesNumber} replies</Replies>
      </TextGroup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 12px;
`;

const Title = styled.h3`
  margin-bottom: 2px;
  margin-top: 0;
`;

const Content = styled.p`
  margin-bottom: 2px;
  margin-top: 0;
`;

const CreatedBy = styled.p`
  font-size: 12px;
  margin-bottom: 2px;
  margin-top: 0;
`;

const Likes = styled(CreatedBy)`
  margin-left: 12px;
  margin-right: 12px;
`;

const Replies = styled(CreatedBy)``;

const TextGroup = styled.div`
  align-items: center;
  display: flex;
`;

const LIKE_THREAD_MUTATION = `
  mutation($id: ID!) {
    likeThread(threadId: $id) {
      id
      likesNumber
    }
  }
`;

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

export default Thead;
