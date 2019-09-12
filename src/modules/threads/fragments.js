import gql from 'graphql-tag';

export const THREAD_FRAGMENT = gql`
  fragment ThreadFragment on Thread {
    id
    text
    title
    createdBy {
      id
      username
    }
    createdAt
    likesNumber
    repliesNumber
  }
`;
