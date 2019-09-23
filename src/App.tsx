import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const App: React.FC = () => (
  <BrowserRouter>
    <div style={{ margin: 20 }}>
      <Routes />
    </div>
  </BrowserRouter>
);

export default App;
