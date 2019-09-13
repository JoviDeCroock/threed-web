import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'urql';
import { Link } from '@reach/router';
import { getToken, removeToken } from '../utils/auth';
import { ME_QUERY } from '../modules/auth/meQuery';
import { Button } from './Button';

const Home = () => {
  const isLoggedIn = !!getToken();

  const [{ data, fetching }, refetch] = useQuery({ query: ME_QUERY });

  return (
    <Wrapper>
      <LinksWrapper>
        <StyledLink to="/">Posts</StyledLink>
        <StyledLink to="/new">Create thread</StyledLink>
      </LinksWrapper>
      {!isLoggedIn ? (
        <Link to="/login">Login</Link>
      ) : (
        <LinksWrapper>
          <WelcomeText>
            {fetching ? "Loading..." : `Welcome ${data.me.username}`}
          </WelcomeText>
          <Button
            type="button"
            onClick={() => {
              removeToken();
              refetch();
            }}
          >
            Logout
          </Button>
        </LinksWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #ff6600;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const WelcomeText = styled.p`
  margin: 0;
  margin-right: 8px;
`;

const LinksWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLink = styled(Link)`
  color: black;
  margin-right: 8px;
`;

export default Home;
