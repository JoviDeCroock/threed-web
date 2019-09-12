import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import './index.css'
import App from './App';
import { getToken, setToken } from './utils/auth';
import { ME_QUERY } from './modules/auth/meQuery';

const cache = cacheExchange({
  updates: {
    Mutation: {
      signin: (result, _args, cache) => {
        const { user, token } = result.signin;
        setToken(token);
        cache.updateQuery({ query: ME_QUERY }, () => ({ me: user }));
      },
      signup: (result, _args, cache) => {
        const { user, token } = result.signup;
        setToken(token);
        cache.updateQuery({ query: ME_QUERY }, () => ({ me: user }));
      }
    }
  }
});

const client = createClient({
  exchanges: [dedupExchange, cache, fetchExchange],
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" }
    };
  },
  url: "http://localhost:3001/graphql"
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);
