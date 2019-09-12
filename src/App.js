import React from 'react';
import { Router } from "@reach/router";
import styled from 'styled-components';
import Header from './components/Header';
import Home from "./components/Home";
import Auth from './components/Auth';

const Wrapper = styled.div`
  background-color: #F6F6EF;
`;

function App() {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <Router>
          <Home path="/" />
          <Auth path="/login" />
        </Router>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
