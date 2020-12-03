import { Router } from 'preact-router';
import { styled } from 'goober';

import Header from './layout/Header';
import Home from "./modules/threads/list";
import Auth from "./modules/auth";
import CreateThread from './modules/threads/create';
import ThreadDetail from './modules/threads/detail';

const Wrapper = styled('div')`
  min-height: 100%;
  padding: 8px 16px;
  background-color: #f6f6ef;
`;

const App = () => (
  <>
    <Header />
    <Wrapper>
      <Router>
        <Home path="/" />
        <CreateThread path="/new" />
        <ThreadDetail path="/threads/:threadId" />
        <Auth path="/login" />
      </Router>
    </Wrapper>
  </>
);

export default App;
