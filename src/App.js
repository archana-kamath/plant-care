import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Authenticate from './components/Home';
import './components/dashboard.css';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';


Amplify.configure(awsconfig);
Auth.configure(awsconfig);
// Auth.currentCredentials().then(creds => console.log(creds));


function App({user}) {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1 className='title'>Hello {user.username} </h1> 
        </div>
      </header>
      <div>
        <div>
          <Dashboard/>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);

