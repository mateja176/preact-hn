import React from 'react';

const MessageContainer: React.FC<Pick<React.CSSProperties, 'height'>> = ({
  height = 'initial',
  children,
}) => (
  <div style={{ height, display: 'flex', alignItems: 'center' }}>
    {children}
  </div>
);

export default MessageContainer;
