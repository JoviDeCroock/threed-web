import { useState, useCallback } from "preact/hooks";
import { styled } from "goober";
import { gql, useMutation } from "@urql/preact";

import { THREAD_FRAGMENT } from "../fragments";
import { Button } from "../../../common/Button";
import { TextField } from "../../../common/TextField";
import { useScrollToTop } from "../../../common/useScrollToTop";

const CreateThread = () => {
  useScrollToTop();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [result, createThread] = useMutation(CREATE_THREAD_MUTATION);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createThread({ title, text }).then(() => {
        setText("");
        setTitle("");
      });
    },
    [title, text, createThread]
  );

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <TextField
          disabled={result.fetching}
          type="text"
          name="title"
          placeholder="title"
          label="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <TextField
          cols="3"
          disabled={result.fetching}
          type="multiline"
          name="text"
          label="text"
          placeholder="insert your text"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <StyledButton type="submit">Create</StyledButton>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const Form = styled("form")`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: min-content;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  width: 75px;
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
