import React from 'react';

const MessageContainer: React.FC<
  Required<Pick<React.CSSProperties, 'height'>>
> = ({ height, children }) => (
  <div style={{ height, display: 'flex', alignItems: 'center' }}>
    {children}
  </div>
);

export default MessageContainer;
