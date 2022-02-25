import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { theme } from './theme';
import { initializeApp } from 'firebase/app';

(function () {
  const firebaseConfig = {
    apiKey: 'AIzaSyCCalDHvx-N-OD-UE4P7XQKdjj3bdCnDN0',
    authDomain: 'napoleon-tech.firebaseapp.com',
    databaseURL: 'https://napoleon-tech-default-rtdb.firebaseio.com',
    projectId: 'napoleon-tech',
    storageBucket: 'napoleon-tech.appspot.com',
    messagingSenderId: '674037683443',
    appId: '1:674037683443:web:abc96f116192681c5a5386',
  };
  const app = initializeApp(firebaseConfig);
})();

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
