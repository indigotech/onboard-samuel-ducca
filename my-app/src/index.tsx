import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './components/LoginPage.css';

import LoginPage from './components/LoginPage';

ReactDOM.render(
    <LoginPage />,
  document.getElementById('root') as HTMLElement
);
