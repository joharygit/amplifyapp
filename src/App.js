import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);


const  App = () =>  {
  return (
      <Authenticator>
        {
          ( {signOut, user }) => (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1> We now have Auth</h1>
              <h2> Hello from V3 .nametraka Auth</h2>
              <button onClick={signOut}>Sign out</button>
            </header>
      
          </div>
        )

      }
      
     </Authenticator> 
  );
}

export default App;
