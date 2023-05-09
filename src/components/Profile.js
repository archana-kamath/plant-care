import React, { useState, useEffect, useInterval } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { getUsers } from '../services/users.service';
import axios from 'axios'
import urls from './utils';
import './styles/profile.css';
import avatar from './styles/avatar.jpeg';
import { Auth } from 'aws-amplify';


function Profile() {
    const [id, setId] = useState();
    ;(async () => {
        const currUser = await Auth.currentAuthenticatedUser();
        console.log(currUser);
        setId(currUser.username);
      })()
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [location, setLocation] = useState();

    const userinfo = getUsers(id).then((user) => {
       return user;
    });
   
   const getUserInfo = async () => {
     const a = await userinfo;
     setFname(a[0]['fname'])
     setLname(a[0]['lname'])
     setEmail(a[0]['email'])
     setContact(a[0]['phone_number'])
     setLocation(a[0]['location'])
   };
   
    getUserInfo(); 
    return(
        <div className="profile">
            <h2 className='myprofile'>My Profile</h2>
            <div className="avatar">
                 <img src={avatar} alt="avatar"></img>
            </div>
        <div className="userDetails">
        <Container>
            <Row>
                <Col><b>User Name: </b> {fname} {lname} </Col>
            </Row>
            <br/>
            <Row>
                <Col><b>Email: </b> {email} </Col>
            </Row>
            <br/>
            <Row>
                <Col><b>Address: </b> {location} </Col>
            </Row>
            <br/>
            <Row>
                <Col><b>Contact:</b> {contact} </Col>
            </Row>
            <br/>
            <Row>
                <Col>           
                    <button style={{margin:'10px', backgroundColor:'#f2f2f2', borderRadius:'0.5em', color:'black', padding:'5px'}}><b>Edit Profile</b></button>
                </Col>
            </Row>
        </Container>
        </div>
        </div>
    )
}

export default Profile;
