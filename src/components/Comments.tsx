import React from 'react';
import { Ids } from '../models';
import CommentContainer from './containers/CommentContainer';

interface CommentsProps {
  commentsIds: Ids;
}

const Comments: React.FC<CommentsProps> = ({ commentsIds }) => (
  <div>
    {commentsIds.map(id => (
      <CommentContainer key={id} id={id} />
    ))}
  </div>
);

export default Comments;
