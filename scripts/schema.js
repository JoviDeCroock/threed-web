const fs = require('fs');
const fetch = require('node-fetch');
const { getIntrospectionQuery } = require('graphql');

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
    fs.writeFile('../src/schema.json', JSON.stringify(data), err => {
      if (err) {
        console.error('Writing failed:', err);
        return;
      }
      console.log('Schema written!');
    });
  });
