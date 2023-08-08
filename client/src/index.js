import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
);
