import React from 'react';
import { styled } from 'goober';
import { gql, useMutation } from 'urql';
import { navigate } from "@reach/router";

import { Button } from '../../common/Button';
import { TextField } from '../../common/TextField';
import { useScrollToTop } from '../../common/useScrollToTop';

const Auth = () => {
  useScrollToTop();
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setUsername('');
    setPassword('');
  }, [isLogin]);

  const [data, executeMutation] = useMutation(isLogin ? SIGN_IN_MUTATION : SIGN_UP_MUTATION);

  const onSubmit = React.useCallback((e) => {
    e.preventDefault();
    executeMutation({ username, password }).then(result => {
      if (!result.error) navigate('/');
    });
  }, [username, password, executeMutation]);

  return (
    <Wrapper onSubmit={onSubmit}>
      <TextField
        type="text"
        onChange={e => setUsername(e.currentTarget.value)}
        placeholder="username"
        name="username"
        label="username"
        disabled={data.fetching}
        value={username}
      />
      <TextField
        type="password"
        label="password"
        onChange={e => setPassword(e.currentTarget.value)}
        name="password"
        disabled={data.fetching}
        value={password}
      />
      <ButtonGroup>
        <Button disabled={data.fetching} type="submit">
          {isLogin ? "login" : "sign up"}
        </Button>
        <Button
          disabled={data.fetching}
          type="button"
          onClick={() => setIsLogin(l => !l)}
        >
          {isLogin ? "I have no account" : "I have an account"}
        </Button>
      </ButtonGroup>
    </Wrapper>
  );
}

const Wrapper = styled('form')`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled('div')`
  align-items: center;
  display: flex;
  > button {
    margin-right: 8px;
  }
`;

const SIGN_IN_MUTATION = gql`
  mutation (
    $username: String!
    $password: String!
  ) {
    signin (username: $username password: $password) {
      token
      user {
        id
        avatar
        username
      }
    }
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation (
    $username: String!
    $password: String!
  ) {
    signup (username: $username password: $password) {
      token
      user {
        id
        avatar
        username
      }
    }
  }
`;

export default Auth;
