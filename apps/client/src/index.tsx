import React, { StrictMode } from 'react';
import { render } from 'react-dom';

import './styles/main.css';
import App from './App';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
