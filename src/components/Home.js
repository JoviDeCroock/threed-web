import React from "react";
import { useQuery } from "urql";
import Thread from './Thread';

const Home = () => {
  const [{ fetching, data }] = useQuery({
    query: THREADS_QUERY,
    variables: { sortBy: "LATEST" }
  });

  if (fetching) return <p>Loading...</p>;

  return (
    <div>
      {data.threads.map(thread => <Thread key={thread.id} {...thread} />)}
    </div>
  );
}

const THREADS_QUERY = `
  query getThreads (
    $sortBy: SortBy!
    $skip: Int
    $limit: Int
  ) {
    threads (sortBy: $sortBy, limit: $limit, skip: $skip) {
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
  }
`;

export default Home;
