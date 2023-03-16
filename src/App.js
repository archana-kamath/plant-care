import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Authenticate from './components/Home';
import './components/dashboard.css';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Card from 'react-bootstrap/Card';
import NodeComponent from './components/node/NodeComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Table,  Col, Row} from 'react-bootstrap';


Amplify.configure(awsconfig);
Auth.configure(awsconfig);
// Auth.currentCredentials().then(creds => console.log(creds));


function App({user}) {

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <Card bg={'Dark'.toLowerCase()} text={'white'}>
            <Card.Body>
              <h3>Plant Care</h3>
            </Card.Body>
        </Card>
          {/* <h1 className='title'>Hello {user.username} </h1>  */}
        </div>
      </header>
      <div>
          <NodeComponent/>
      </div>
    </div>
  );
}

export default withAuthenticator(App);

