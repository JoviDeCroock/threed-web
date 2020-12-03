import { createElement, render } from "preact";
import { prefix } from "goober-autoprefixer";
import { styled, setup } from "goober";
import { Router } from "preact-router";
import { Provider } from "@urql/preact";

import Header from "./layout/Header";
import Home from "./modules/threads/list";
import Auth from "./modules/auth";
import CreateThread from "./modules/threads/create";
import ThreadDetail from "./modules/threads/detail";

import { client } from "./client";

setup(createElement, prefix);

const Wrapper = styled("main")`
  min-height: 100%;
  padding: 8px 16px;
  background-color: #f6f6ef;
`;

render(
  <Provider value={client}>
    <Header />
    <Wrapper>
      <Router>
        <Home path="/" />
        <CreateThread path="/new" />
        <ThreadDetail path="/threads/:threadId" />
        <Auth path="/login" />
      </Router>
    </Wrapper>
  </Provider>,
  document.body
);
