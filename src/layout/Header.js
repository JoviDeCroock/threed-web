import { styled } from 'goober';
import { useQuery } from '@urql/preact';
import { Link } from 'preact-router';

import { getToken, removeToken } from '../utils/auth';
import { ME_QUERY } from '../modules/auth/meQuery';
import { Button } from '../common/Button';

const Home = () => {
  const isLoggedIn = !!getToken();

  const [{ data, fetching }, refetch] = useQuery({ query: ME_QUERY });

  return (
    <Wrapper>
      <LinksWrapper>
        <StyledLink href="/">Posts</StyledLink>
        <StyledLink href="/new">Create thread</StyledLink>
      </LinksWrapper>
      {!isLoggedIn ? (
        <Link href="/login">Login</Link>
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

const Wrapper = styled('div')`
  background-color: #ff6600;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const WelcomeText = styled('p')`
  margin: 0;
  margin-right: 8px;
`;

const LinksWrapper = styled('div')`
  align-items: center;
  display: flex;
`;

const StyledLink = styled(Link)`
  color: black;
  margin-right: 8px;
`;

export default Home;
