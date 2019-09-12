import React from 'react';
import { Router } from "@reach/router";
import styled from 'styled-components';
import Header from './components/Header';
import Home from "./modules/threads/list";
import Auth from "./modules/auth";
import CreateThread from './modules/threads/create';
import ThreadDetail from './modules/threads/detail';

const Wrapper = styled.div`
  min-height: 100%;
  padding: 8px 16px;
  background-color: #f6f6ef;
`;

const App = () => (
  <React.Fragment>
    <Header />
    <Wrapper>
      <Router>
        <Home path="/" />
        <CreateThread path="/new" />
        <ThreadDetail path="/threads/:threadId" />
        <Auth path="/login" />
      </Router>
    </Wrapper>
  </React.Fragment>
);

export default App;
