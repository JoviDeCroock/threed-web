import { THREAD_FRAGMENT, REPLY_FRAGMENT } from "../fragments";
import { gql, useQuery } from "@urql/preact";
import { styled } from "goober";

import Reply from "./reply";
import CreateReply from "./reply/Create";
import { useScrollToTop } from "../../../common/useScrollToTop";

const ThreadDetail = ({ params }) => {
  useScrollToTop();

  const { threadId } = params;

  const [{ fetching, data, error }] = useQuery({
    query: THREAD_QUERY,
    variables: { id: threadId },
  });

  if (fetching || error) return <p>Loading...</p>;

  return (
    <Wrapper>
      <HeaderContainer>
        <h3>{data.thread.title}</h3>
        <p>{data.thread.text}</p>
      </HeaderContainer>
      <Replies>
        <h4>Replies:</h4>
        {data.thread.replies && data.thread.replies.length > 0 ? (
          data.thread.replies.map((reply) => (
            <Reply key={reply.id} {...reply} />
          ))
        ) : (
          <p>No replies yet, be the first to reply!</p>
        )}
      </Replies>
      <CreateReply threadId={threadId} />
    </Wrapper>
  );
};

const THREAD_QUERY = gql`
  query($id: ID!) {
    thread(id: $id) {
      ...ThreadFragment
      replies {
        ...ReplyFragment
      }
    }
  }
  ${THREAD_FRAGMENT}
  ${REPLY_FRAGMENT}
`;

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

const HeaderContainer = styled("div")`
  background: white;
  border: 1px solid black;
  padding: 16px;
  > h3 {
    margin-bottom: 8px;
    margin-top: 0;
  }
  > p {
    margin: 0;
  }
`;

const Replies = styled("div")`
  display: flex;
  flex-direction: column;
`;

export default ThreadDetail;
