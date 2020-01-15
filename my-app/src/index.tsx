import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import './components/Input.css';
import './components/UserListPage.css';


import LoginPage from './components/LoginPage';
import { tsPropertySignature } from '@babel/types';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserListPage from './components/UserListPage';
import { AddUserPage } from './components/AddUserPage';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  })
});

const App = () => (
  <Router>
    <Switch>
      <Route path="/adduser">
        <AddUserPage/>
      </Route>
      <Route path="/users">
        <UserListPage/>
      </Route>
      <Route exact path="/">
        <LoginPage />
      </Route>
    </Switch>
  </Router>

);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
 ,
  document.getElementById('root') as HTMLElement
)

