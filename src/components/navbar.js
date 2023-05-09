import React  from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import Dashboard from './Dashboard';
import AddProject from './project/addProject';
import ListProjects from './project/listProject';
import Home from './Home';
import NodeComponent from './node/NodeComponent';
import ProjectUpdateForm from './project/updateProject';
import './navbar.css';

// import './navbar.css';

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-4">
  {/* <!-- Container wrapper --> */}
  <div class="container-fluid">
    {/* <!-- Toggle button --> */}
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarRightAlignExample"
      aria-controls="navbarRightAlignExample"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    {/* <!-- Collapsible wrapper --> */}
    <div class="collapse navbar-collapse" id="navbarRightAlignExample">
      {/* <!-- Left links --> */}
   
      {/* <!-- Left links --> */}
      <a class="navbar-nav ms-auto mb-2 mb-lg-0" href="/profile" style={{textDecoration:'none', color:'black'}}>Welcome </a>
      &nbsp;&nbsp;
      <div class="dropdown">
        <a
          class="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="/profile"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
            class="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar"
        >
          <li>
            <a class="dropdown-item" href="#">My profile</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Settings</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
    {/* <!-- Collapsible wrapper --> */}
  </div>
  {/* <!-- Container wrapper --> */}
</nav>

  );
}

export default NavBar;


 