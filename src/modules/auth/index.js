import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import { navigate } from "@reach/router";
import { Button } from '../../components/Button';

const Auth = () => {
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
      <InputGroup>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          onChange={e => setUsername(e.currentTarget.value)}
          id="username"
          name="username"
          disabled={data.fetching}
          value={username}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          onChange={e => setPassword(e.currentTarget.value)}
          id="password"
          name="password"
          disabled={data.fetching}
          value={password}
        />
      </InputGroup>
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

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  align-items: center;
  display: flex;
  > button {
    margin-right: 8px;
  }
`;

const InputGroup = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;
  > label {
    width: 100px;
  }
  > input {
    width: 400px;
  }
`;

const SIGN_IN_MUTATION = `
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

const SIGN_UP_MUTATION = `
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
