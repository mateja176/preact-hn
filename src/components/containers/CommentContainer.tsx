import React from 'react';
import {
  AsyncProps,
  IfFulfilled,
  IfPending,
  IfRejected,
  useAsync,
} from 'react-async';
import { IComment, WithId } from '../../models';
import { fetchJSON } from '../../utils';
import Comment from '../Comment';
import MessageContainer from '../MessageContainer';

const minCommentHeight = 68;

const fetchItem = ({ id }: AsyncProps<IComment>) =>
  fetchJSON(`/item/${id}.json`);

const CommentContainer: React.FC<WithId> = ({ id }) => {
  const state = useAsync<IComment>({ promiseFn: fetchItem, id });

  return (
    <>
      <IfPending state={state}>
        <MessageContainer height={minCommentHeight}>
          Loading comment...
        </MessageContainer>
      </IfPending>
      <IfRejected state={state}>
        {() => (
          <MessageContainer height={minCommentHeight}>
            Error while loading comment, please retry.
          </MessageContainer>
        )}
      </IfRejected>
      <IfFulfilled state={state}>
        {comment => <Comment {...comment}></Comment>}
      </IfFulfilled>
    </>
  );
};

export default CommentContainer;
