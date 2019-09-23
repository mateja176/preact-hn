import React from 'react';
import { IComment } from '../models';
import Comments from './Comments';

const Comment: React.FC<Omit<IComment, 'id'>> = ({ by, text, kids = [] }) => (
  <>
    <i>{by}</i>
    <p dangerouslySetInnerHTML={{ __html: text }} />
    <div
      style={{ borderLeft: '1px solid grey', marginLeft: 10, paddingLeft: 10 }}
    >
      <Comments commentsIds={kids} />
    </div>
  </>
);

export default Comment;
