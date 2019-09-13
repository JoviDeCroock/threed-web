import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import { REPLY_FRAGMENT } from '../../fragments';
import gql from 'graphql-tag';
import { Button } from '../../../../components/Button';

const CreateReply = ({ threadId }) => {
  const [result, reply] = useMutation(CREATE_REPLY_MUTATION);

  const [text, setText] = React.useState('');

  const onSubmit = React.useCallback(e => {
    e.preventDefault();
    reply({ threadId, text }).then(() => {
      setText('');
    });
  }, [text, reply, threadId]);

  return (
    <Form onSubmit={onSubmit}>
      <InputWrapper>
        <label htmlFor="text">Create a reply</label>
        <TextArea
          name="text"
          id="text"
          disabled={result.fetching}
          onChange={e => setText(e.currentTarget.value)}
          value={text}
        />
      </InputWrapper>
      <StyledButton type="submit">Submit</StyledButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: min-content;
`;

const InputWrapper = styled.div`
  align-items: flex-start;
  display: flex;
`;

const TextArea = styled.textarea`
  width: 500px;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
`;

const CREATE_REPLY_MUTATION = gql`
  mutation($threadId: ID!, $text: String!) {
    reply(input: { threadId: $threadId, text: $text }) {
      ...ReplyFragment
    }
  }
  ${REPLY_FRAGMENT}
`;

export default CreateReply;
