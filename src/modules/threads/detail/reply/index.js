import React from "react";
import styled from 'styled-components';
import { useSubscription } from 'urql';
import gql from 'graphql-tag';
import { timeDifferenceForDate } from "../../../../utils/timeDiff";

const Reply = ({ text, id, createdBy, createdAt }) => {
  useSubscription({ query: NEW_REPLY_LIKE, variables: { id } });

  return (
    <Wrapper>
      <Body>
        <Text>{text}</Text>
      </Body>
      <Footer>
        CreatedBy {createdBy.username} - {timeDifferenceForDate(createdAt)}
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-bottom: 8px;
`;

const Footer = styled.span`
  font-size: 12px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 16px;
  margin: 0;
  margin-bottom: 8px;
`;

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
