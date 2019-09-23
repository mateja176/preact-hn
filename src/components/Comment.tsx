import React from 'react';
import { IComment } from '../models';
import Comments from './Comments';

const Comment: React.FC<Omit<IComment, 'id'>> = ({ by, text, kids = [] }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div>
        <i
          onClick={toggleCollapsed}
          onKeyPress={toggleCollapsed}
          tabIndex={0}
          role="button"
          style={{ cursor: 'pointer' }}
        >
          {collapsed ? '▼' : '▲'}
        </i>
        <i>{by}</i>
      </div>
      <div
        style={{
          display: collapsed ? 'none' : 'initial',
        }}
      >
        <p dangerouslySetInnerHTML={{ __html: text }} />
        <div
          style={{
            borderLeft: '1px solid lightgrey',
            marginLeft: 10,
            paddingLeft: 10,
          }}
        >
          <Comments commentsIds={kids} />
        </div>
      </div>
    </>
  );
};

export default Comment;
