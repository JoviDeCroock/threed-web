import React from "react";
import gql from "graphql-tag";
import { THREAD_FRAGMENT } from "../fragments";

const CreateThread = () => {
  return <div>hello</div>;
};

const CREATE_THREAD_MUTATION = gql`
  mutation($title: String!, $text: String!) {
    createThread(title: $title, text: $text) {
      ...ThreadFragment
    }
  }
  ${THREAD_FRAGMENT}
`;

export default CreateThread;
