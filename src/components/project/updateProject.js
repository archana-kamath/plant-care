import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import urls from '../utils';
import { Container, Card, Form, Row,Col, Button, FloatingLabel } from "react-bootstrap";
function ProjectUpdateForm(props) {
    const navigate=useNavigate();
    const location = useLocation();
    const state = location.state;
    const [project_id, setProjectId] =useState(state?.project_id);
    const [user_id, setUserId] = useState(state?.user_id);
  
    const [proj_desc ,setDesc]=useState(state?.proj_desc);
    const [proj_name,setName]=useState(state?.proj_name);
    const [proj_type,setType]=useState(state?.proj_type);
    



//   return (
//     <div>
//       <p>ID: {data?.id}</p>
//       <p>Name: {data?.name}</p>
//     </div>
//   );
//   const [projectName, setProjectName] = useState(props.project.name);
//   const [projectDescription, setProjectDescription] = useState(props.project.description);

  const handleProjectUpdate = () => {
    let proj_data={project_id,user_id,proj_type,proj_desc,proj_name};
        console.log("data to be sent update DB",proj_data)

    axios.put(urls.backendURL+'/projects',proj_data)
    .then(res=>{
        if (res.status==200){
            console.log("res data of update project api ",res.data);
            // alert(res.data.result);
            navigate('/listproj');
            console.log("project updating successful");
        }
        else{
            console.log("project updating unsuccessful");
        }  
    }).catch(error => {
        console.error(error);
     });
    
  }

  return (
    
    <Container fluid>
          <h4>Update Project Details</h4>
            <Card style={{ width: '60rem' }}>
                <Card.Body>
           
           <form   style={{fontWeight:"800"}}>
              
               <FloatingLabel controlId="proj_name" label="Project Name" className="mb-3">
               <Form.Control type="text"  name="proj_name" value={proj_name} onChange={e=>{setName(e.target.value)}} required/>
               </FloatingLabel>

                  <FloatingLabel className="mb-3" label="Project Description" controlId='proj_desc'>
                  <Form.Control type="text"  name="proj_desc" value={proj_desc} onChange={e=>{setDesc(e.target.value)}} required/>
                  </FloatingLabel>

                  
                  <FloatingLabel className="mb-3" label="Project Type" controlId='proj_type'>
                  <Form.Control
                    name="proj_type"
                    as="select"
                    value={proj_type}
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
                   <Button onClick={handleProjectUpdate} variant="dark">Update Project</Button>
                   </Col>
               </Row>
               </form>
           </Card.Body>
            </Card>
    </Container>
    
  );
}

export default ProjectUpdateForm;
