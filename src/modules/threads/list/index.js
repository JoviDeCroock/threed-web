import React from "react";
import { useQuery } from "urql";
import Thread from "./Thread";
import gql from "graphql-tag";
import { THREAD_FRAGMENT } from "../fragments";

const Home = () => {
  const [{ fetching, data }] = useQuery({
    query: THREADS_QUERY,
    variables: { sortBy: "LATEST" }
  });

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

export default Home;
