import React from 'react';

export interface ErrProps extends Pick<Error, 'message'> {
  action: () => void;
  actionText: string;
}

const Err: React.FC<ErrProps> = ({ message, action, actionText }) => (
  <>
    {message},&nbsp;
    <span
      style={{ textDecoration: 'underline', cursor: 'pointer' }}
      onClick={action}
    >
      {actionText}
    </span>
  </>
);

export default Err;
