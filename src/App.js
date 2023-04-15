import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Authenticate from './components/Home';
import './components/dashboard.css';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Card from 'react-bootstrap/Card';
import NodeComponent from './components/node/NodeComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Table, Col, Row } from 'react-bootstrap';
import NavBar from './components/navbar';
import Sidebar from './components/Sidebar'
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import AddProject from '../src/components/project/addProject';
import ListProjects from '../src/components/project/listProject';
import Home from './components/Home';
import Profile from './components/Profile';
import ProjectUpdateForm from './components/project/updateProject';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
// Auth.currentCredentials().then(creds => console.log(creds));

function App({ user }) {

  return (
    <div className="App" id="outer-container">

      {/* <header className="App-header">
       
              <h3>Plant Care</h3>
     
        <h4 className='oval-box'> Hello {user.username} ! &#x1F600; </h4>    
      </header> */}

      < NavBar />
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <body>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addproj" element={<AddProject />} />
            <Route path="/listproj" element={<ListProjects />} />
            <Route path="/updateproj" element={<ProjectUpdateForm/>}/>
            <Route path="/node/:id" element={<NodeComponent />} />
            <Route exact path="/profile" element={<Profile/>}/>
          </Routes>
        </BrowserRouter>
      </body>
    </div>


    // <div className="App">
    //   <header className="App-header">
    //     <div>
    //     <Card bg={'Dark'.toLowerCase()} text={'white'}>
    //         <Card.Body>
    //           <h3>Plant Care</h3>
    //         </Card.Body>
    //     </Card>
    //       {/* <h1 className='title'>Hello {user.username} </h1>  */}
    //     </div>
    //   </header>

    // </div>
  );
}

export default App;

