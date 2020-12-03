import { gql, useQuery } from "@urql/preact";

import Thread from "./Thread";
import { THREAD_FRAGMENT } from "../fragments";
import { useScrollToTop } from "../../../common/useScrollToTop";

const Home = () => {
  useScrollToTop();
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
