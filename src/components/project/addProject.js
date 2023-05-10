import React  from 'react';
import { useEffect, useState } from 'react';
import { Container, Card, Form, Row,Col, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import urls from '../utils';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Auth } from 'aws-amplify';

export default function AddProject(){
   const navigate = useNavigate();
//    const [projData, setprojData]=useState({});
   const [project_id, setProjectId] =useState();
   const [proj_desc ,setDesc]=useState();
   const [proj_name,setName]=useState();
   const [proj_type,setType]=useState('Home');
   const [user_id, setUserId] = useState(null);
  
  
   useEffect(() => {
    async function fetchUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserId(user.attributes.email);
        console.log("user is ",user.attributes.email);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    }
    fetchUser();
    
  }, []);

    // const nav=useNavigate();
    // const handleChange=(event)=>{
    //     event.preventDefault();
        // setprojData({...projData,[event.target.name]:event.target.value});     
    // }
    const handleSubmit=(event)=>{
        event.preventDefault();
        // setProjectId(uuidv4());
        let proj_data={project_id:uuidv4(),user_id,proj_type,proj_desc,proj_name};
        console.log("data to be sent to DB",proj_data)
 
        axios.post(urls.backendURL+'/projects',proj_data)
        .then(res=>{
            if (res.status==200){
                console.log("res data of add project api ",res.data);
                // alert(res.data.result);
                navigate('/listproj');
                console.log("project adding successful");
            }
            else{
                console.log("project adding unsuccessful");
            }  
        }).catch(error => {
            console.error(error);
         });
    }

    
 


return(

    <Container fluid>
            <Card style={{ width: '60rem' }}>
                <Card.Body>

           <form onSubmit={handleSubmit}  style={{fontWeight:"800"}}>
              
               <h4>Please fill the Project details below</h4>
               <FloatingLabel controlId="proj_name" label="Project Name" className="mb-3">
               <Form.Control type="text"  name="proj_name" onChange={e=>{setName(e.target.value)}} required/>
               </FloatingLabel>

                  {/* <Form.Floating className="mb-3">
                  <label htmlFor="proj_name" style={{marginLeft:10}} >Project Name </label>
                  <Form.Control type="text"  name="proj_name" onChange={e=>{setName(e.target.value)}} required/>
                  </Form.Floating> */}

                  <FloatingLabel className="mb-3" label="Project Description" controlId='proj_desc'>
                  <Form.Control type="text"  name="proj_desc" onChange={e=>{setDesc(e.target.value)}} required/>
                  </FloatingLabel>

                  
                  <FloatingLabel className="mb-3" label="Project Type" controlId='proj_type'>
                  <Form.Control
                    name="proj_type"
                    as="select"
                    onChange={e=>{setType(e.target.value)}}
                   
                    //   onChange={e => {
                    //     console.log("e.target.value", e.target.value);
                        // setType(e.target.value);
                    //   }}
                    >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Farm">Farm</option>
                    </Form.Control>
                    </FloatingLabel>

             
               <br></br>
               <Row>
                   <Col>
                   <Button type="submit" variant="dark">Add Project</Button>
                   </Col>
               </Row>
               </form>
           </Card.Body>
            </Card>
    </Container>
)

}
