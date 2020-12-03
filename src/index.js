import React, { createElement } from "react";
import { render } from "react-dom";
import { prefix } from "goober-autoprefixer";
import { setup } from "goober";
import { Provider } from "urql";

import App from "./App";
import { client } from "./client";

setup(createElement, prefix);

render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.body
);
