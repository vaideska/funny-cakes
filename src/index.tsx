import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App'
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
