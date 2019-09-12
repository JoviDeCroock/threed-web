import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { useMutation } from "urql";
import { THREAD_FRAGMENT } from "../fragments";

const CreateThread = () => {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState('');

  const [result, createThread] = useMutation(CREATE_THREAD_MUTATION);

  const onSubmit = React.useCallback(e => {
    e.preventDefault();
    createThread({ title, text });
  }, [title, text, createThread]);

  return (
    <Wrapper onSubmit={onSubmit}>
      <InputGroup>
        <label htmlFor="title">Title: </label>
        <input
          disabled={result.fetching}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={e => setTitle(e.currentTarget.value)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="text">Text: </label>
        <textarea
          cols="3"
          disabled={result.fetching}
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={e => setText(e.currentTarget.value)}
        />
      </InputGroup>
      <Button type="submit">Create</Button>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: min-content;
`;

const InputGroup = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;

  > label {
    width: 100px;
  }
  > input, textarea {
    width: 400px;
  }
`;

const Button = styled.button`
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
