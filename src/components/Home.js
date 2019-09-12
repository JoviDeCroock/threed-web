import React from "react";
import { useQuery } from "urql";
import styled from "styled-components";
import Thread from './Thread';

const Home = () => {
  const [{ fetching, data, error }] = useQuery({
    query: THREADS_QUERY,
    variables: { sortBy: "LATEST" }
  });

  if (fetching) return <p>Loading...</p>;

  console.log(data, error);

  return (
    <Wrapper>
      {data.threads.map(thread => <Thread key={thread.id} {...thread} />)}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding: 8px 16px;
`;

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
