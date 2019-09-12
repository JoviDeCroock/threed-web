import React from 'react';
import styled from 'styled-components';

const Thead = ({ title, text, createdBy }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{text}</Content>
      <CreatedBy>Created by: {createdBy.username}</CreatedBy>
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
  margin-bottom: 0;
  margin-top: 0;
`;

export default Thead;
