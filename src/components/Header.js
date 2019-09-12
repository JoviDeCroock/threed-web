import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { getToken } from '../utils/auth';

const Wrapper = styled.div`
  background-color: #ff6600;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Home = () => {
  const isLoggedIn = !!getToken();
  return (
    <Wrapper>
      <Link to="/">Posts</Link>
      {!isLoggedIn && <Link to="/login">Login</Link>}
    </Wrapper>
  );
}

export default Home;
