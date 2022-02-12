import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme} >
      <Provider store={store}>
          <Router>
            <App />
          </Router>
      </Provider >
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
