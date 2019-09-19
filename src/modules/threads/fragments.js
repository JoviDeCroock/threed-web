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
    hasUserLiked
    likesNumber
    repliesNumber
  }
`;

export const REPLY_FRAGMENT = gql`
  fragment ReplyFragment on Reply {
    id
    text
    createdBy {
      id
      username
    }
    createdAt
    hasUserLiked
    likesNumber
  }
`;
