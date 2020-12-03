import { createElement, render } from 'preact';
import { prefix } from 'goober-autoprefixer';
import { setup } from 'goober';
import { Provider } from '@urql/preact';

import App from "./App";
import { client } from "./client";

setup(createElement, prefix);

render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.body
);
