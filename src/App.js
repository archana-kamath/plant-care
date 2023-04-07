import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Authenticate from './components/Home';
import './components/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Card from 'react-bootstrap/Card';
import NodeComponent from './components/node/NodeComponent';
import Home from './components/Home';
import Profile from './components/Profile';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


Amplify.configure(awsconfig);
Auth.configure(awsconfig);
// Auth.currentCredentials().then(creds => console.log(creds));


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <Card bg={'Dark'.toLowerCase()} text={'white'}>
            <Card.Body><Card.Body>
              <h3>Plant Care</h3>
            </Card.Body></Card.Body>
        </Card>
        </div>
      </header>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/node" element={<NodeComponent/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
          </Routes>
        </Router>
        <div>
      </div>
      </div>
    </div>
  );
}

export default App;

