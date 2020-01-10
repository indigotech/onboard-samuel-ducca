import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import './components/LoginPage.css';

import LoginPage from './components/LoginPage';
import { tsPropertySignature } from '@babel/types';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  })
});

const App = () => (
  <ApolloProvider client={client}>
      <LoginPage />
  </ApolloProvider>
);

ReactDOM.render(
    //<LoginPage />,
    <App />,
  document.getElementById('root') as HTMLElement
)

