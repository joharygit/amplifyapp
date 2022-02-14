import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react-v1';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1> We now have Auth</h1>
        <h2> Hello from V3 .nametraka Auth</h2>
        
      </header>
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
