#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { getIntrospectionQuery } = require('graphql');
const { minifyIntrospectionQuery } = require('@urql/introspection');

fetch('https://threed-test-api.herokuapp.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: getIntrospectionQuery({ descriptions: false }),
  }),
})
  .then(result => result.json())
  .then(({ data }) => {
    data = JSON.stringify(minifyIntrospectionQuery(data));
    fs.writeFile(
      path.resolve(__dirname, '../src/schema.js'),
      `export default JSON.parse(${JSON.stringify(data)});`,
      err => {
        if (err) {
          console.error('Writing failed:', err);
          process.exit(1);
        }

        console.log('Schema written!');
      }
    );
  });
