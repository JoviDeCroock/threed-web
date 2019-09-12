import React from 'react';
import styled from 'styled-components';

const Thead = ({ title, text, createdBy, likesNumber, repliesNumber }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{text}</Content>
      <CreatedBy>Created by: {createdBy.username}</CreatedBy>
      <TextGroup>
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
  margin-right: 12px;
`;

const Replies = styled(CreatedBy)``;

const TextGroup = styled.div`
  align-items: center;
  display: flex;
`;

export default Thead;
