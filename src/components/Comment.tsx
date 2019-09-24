import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IComment } from '../models';
import Comments from './Comments';

const Comment: React.FC<Omit<IComment, 'id'>> = ({ by, text, kids = [] }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        <OverlayTrigger
          overlay={
            <Tooltip id="collapse">{collapsed ? 'Collapse' : 'Expand'}</Tooltip>
          }
        >
          <i
            className="material-icons"
            onClick={toggleCollapsed}
            onKeyPress={toggleCollapsed}
            tabIndex={0}
            role="button"
            style={{ cursor: 'pointer', marginRight: 10 }}
          >
            {collapsed ? 'expand_more' : 'expand_less'}
          </i>
        </OverlayTrigger>
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
    </div>
  );
};

Comment.displayName = 'comment';

export default Comment;
