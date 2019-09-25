import React from 'react';
import { AtomSpinner } from 'react-epic-spinners';

export interface SpinnerProps
  extends React.ComponentProps<typeof AtomSpinner> {}

const Spinner: React.FC<SpinnerProps> = ({ children, ...props }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <AtomSpinner color="inherit" size={200} {...props} />
    {children && <h4 style={{ marginTop: 40 }}>{children}</h4>}
  </div>
);

export default Spinner;
