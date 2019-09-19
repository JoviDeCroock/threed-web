import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import { REPLY_FRAGMENT } from '../../fragments';
import gql from 'graphql-tag';
import { Button } from '../../../../common/Button';
import { TextField } from '../../../../common/TextField';

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
      <TextField
        name="text"
        placeholder="text"
        label="Reply"
        type="multiline"
        disabled={result.fetching}
        onChange={e => setText(e.currentTarget.value)}
        value={text}
      />
      <StyledButton type="submit">Submit</StyledButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: min-content;
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
