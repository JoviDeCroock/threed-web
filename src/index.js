import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import './index.css'
import App from './App';

const cache = cacheExchange({});

const client = createClient({
  exchanges: [dedupExchange, cache, fetchExchange],
  url: "http://localhost:3001/graphql"
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);
