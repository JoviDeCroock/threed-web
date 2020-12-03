import React from 'react';
import { styled } from 'goober';
import { gql, useMutation } from 'urql';
import { Link } from "@reach/router";

import { timeDifferenceForDate } from '../../../utils/timeDiff';
import { useNewLikes, useNewReplies } from '../common';
import { LikeButton } from '../common/LikeButton';
import { getToken } from '../../../utils/auth';

const Thead = ({ title, text, createdBy, likesNumber, repliesNumber, id, createdAt }) => {
  const [result, like] = useMutation(LIKE_THREAD_MUTATION);

  useNewLikes(id);
  useNewReplies(id);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{text}</Content>
      <CreatedBy>
        Created by: {createdBy.username} - {timeDifferenceForDate(createdAt)}
      </CreatedBy>
      <TextGroup>
        <LikeButton disabled={result.fetching || !getToken()} onClick={() => like({ id })} />
        <Likes>{likesNumber} likes</Likes>
        <Replies to={`/threads/${id}`}>{repliesNumber} replies</Replies>
      </TextGroup>
    </Wrapper>
  );
}

const Wrapper = styled('div')`
  border-bottom: 1px solid black;
  margin-bottom: 12px;
  padding: 16px;
`;

const Title = styled('h3')`
  margin-bottom: 6px;
  margin-top: 0;
`;

const Content = styled('p')`
  margin-bottom: 2px;
  margin-top: 0;
`;

const CreatedBy = styled('p')`
  font-size: 12px;
  margin-bottom: 2px;
  margin-top: 0;
`;

const Likes = styled(CreatedBy)`
  margin-left: 12px;
  margin-right: 12px;
`;

const Replies = styled(Link)`
  color: black;
  font-size: 12px;
  margin-bottom: 2px;
  margin-top: 0;
`;

const TextGroup = styled('div')`
  align-items: center;
  display: flex;
`;

const LIKE_THREAD_MUTATION = gql`
  mutation($id: ID!) {
    likeThread(threadId: $id) {
      id
      hasUserLiked
      likesNumber
    }
  }
`;

export default Thead;
