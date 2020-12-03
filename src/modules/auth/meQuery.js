import { gql } from '@urql/preact';

export const ME_QUERY = gql`
  query {
    me {
      id
      username
      avatar
    }
  }
`;
