import { styled } from 'goober';
import { gql, useMutation } from '@urql/preact';
import { timeDifferenceForDate } from "../../../../utils/timeDiff";
import { LikeButton } from "../../common/LikeButton";
import { REPLY_FRAGMENT } from "../../fragments";
import { getToken } from "../../../../utils/auth";

const Reply = ({ text, id, createdBy, createdAt, likesNumber }) => {
  const [result, like] = useMutation(LIKE_REPLY);

  return (
    <Wrapper>
      <Body>
        <Text>{text}</Text>
      </Body>
      <Footer>
        <LikeButton
          disabled={result.fetching || !getToken()}
          onClick={() => like({ id })}
        />
        {likesNumber} -&nbsp; created by {createdBy.username} -&nbsp;
        {timeDifferenceForDate(createdAt)}
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled('div')`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-bottom: 8px;
`;

const Footer = styled('span')`
  font-size: 12px;
`;

const Body = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Text = styled('p')`
  font-size: 16px;
  margin: 0;
  margin-bottom: 8px;
`;

const LIKE_REPLY = gql`
  mutation ($id: ID!) {
    likeReply (replyId: $id) {
      ...ReplyFragment
    }
  }
  ${REPLY_FRAGMENT}
`;

export default Reply;
