import React from "react";
import { useQuery, useSubscription } from "urql";
import Thread from "./Thread";
import gql from "graphql-tag";
import { THREAD_FRAGMENT } from "../fragments";

const Home = () => {
  const [{ fetching, data }] = useQuery({
    query: THREADS_QUERY,
    variables: { sortBy: "LATEST" }
  });

  useSubscription({ query: NEW_THREAD_SUBSCRIPTION });

  if (fetching) return <p>Loading...</p>;

  return (
    <div>
      {data.threads.map(thread => (
        <Thread key={thread.id} {...thread} />
      ))}
    </div>
  );
};

const THREADS_QUERY = gql`
  query($sortBy: SortBy!, $skip: Int, $limit: Int) {
    threads(sortBy: $sortBy, limit: $limit, skip: $skip) {
      ...ThreadFragment
    }
  }
  ${THREAD_FRAGMENT}
`;

const NEW_THREAD_SUBSCRIPTION = gql`
  subscription {
    newThread {
      ...ThreadFragment
    }
  }
  ${THREAD_FRAGMENT}
`;

export default Home;
