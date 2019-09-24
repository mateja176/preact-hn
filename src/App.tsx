import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const App: React.FC = () => (
  <BrowserRouter>
    <div style={{ margin: 20 }}>
      <Routes />
    </div>
  </BrowserRouter>
);

export default hot(module)(App);
