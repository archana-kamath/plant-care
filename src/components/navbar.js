import React  from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import Dashboard from './Dashboard';
import AddProject from './project/addProject';
import ListProjects from './project/listProject';
import Home from './Home';
import NodeComponent from './node/NodeComponent';

import './navbar.css';

function NavBar() {
  return (
    <Navbar className='mr-navbar'>
    <BrowserRouter>
    <nav className="mr-auto">
         <Nav className="my-brand">
         <Link style={{color:'black'}}  to="/">Dashboard</Link>
         </Nav>
          <Nav className="my-brand">
          <Link  style={{color:'black'}}  to="/listproj">Project</Link>
          </Nav> 
          <Nav className="my-brand">
          <Link style={{color:'black'}}  to="/node">Node</Link>
          </Nav>
          <Nav className="my-brand">
          <Link style={{color:'black'}}  to="/user">My Profile</Link>
          </Nav>
          <Nav className="my-brand">
          <Link style={{color:'black'}} to="/logout">Logout</Link>
          {/* <Button style={{ backgroundColor: 'dark-green', color: 'white', padding: '10px', borderRadius: '5px' }}>Logout </Button> */}
          </Nav>
      </nav>


    <Routes>
    <Route path="/" element={<Dashboard/>} />
    <Route path="/addproj" element={<AddProject/>} />
    <Route path="/listproj" element={<ListProjects/>} />
    <Route path="/node" element={<NodeComponent/>} />
    <Route path="/logout" element={<Home/>} />
    </Routes>
    </BrowserRouter>
    </Navbar>
  );
}

export default NavBar;