import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { useMutation } from "urql";
import { THREAD_FRAGMENT } from "../fragments";
import { Button } from "../../../components/Button";
import { TextField } from "../../../components/TextField";

const CreateThread = () => {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState('');

  const [result, createThread] = useMutation(CREATE_THREAD_MUTATION);

  const onSubmit = React.useCallback(e => {
    e.preventDefault();
    createThread({ title, text }).then(() => {
      setText('');
      setTitle('');
    });
  }, [title, text, createThread]);

  return (
    <Wrapper onSubmit={onSubmit}>
      <TextField
        disabled={result.fetching}
        type="text"
        name="title"
        placeholder="title"
        label="title"
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <TextField
        cols="3"
        disabled={result.fetching}
        type="multiline"
        name="text"
        label="text"
        placeholder="insert your text"
        value={text}
        onChange={e => setText(e.currentTarget.value)}
      />
      <StyledButton type="submit">Create</StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: min-content;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  width: 50px;
`;

const CREATE_THREAD_MUTATION = gql`
  mutation($title: String!, $text: String!) {
    createThread(input: { title: $title, text: $text }) {
      ...ThreadFragment
    }
  }
  ${THREAD_FRAGMENT}
`;

export default CreateThread;
